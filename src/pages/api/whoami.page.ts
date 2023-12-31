import { connectDb } from '@/utils/db'
import { getAuth } from '@clerk/nextjs/server'
import { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

interface User {
  id: string
  clerk_id: string
  name: string
  created_at: string
}

interface Whoami {
  clerk_id: string
  id: string
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await GET(req, res as NextApiResponse<Whoami>)
      break
    default:
      res.status(405).end()
      break
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse<Whoami>) {
  const { userId: clerkId } = getAuth(req)

  if (clerkId === null) {
    res.status(401).end()
    return
  }

  let connection: Connection | undefined
  try {
    connection = await connectDb()

    const [rows] = await connection.execute(
      'SELECT * FROM `users` WHERE `clerk_id` = ?',
      [clerkId]
    )

    if ((rows as User[]).length === 0) {
      console.log('clerk_id ' + clerkId + ' not found, creating user')

      await connection.execute(
        'INSERT INTO `users` (`id`, `clerk_id`, `name`) VALUES (?, ?, ?)',
        [uuidv4(), clerkId, '']
      )
      return
    }

    const row = (rows as User[])[0]

    return res.status(200).json({
      clerk_id: clerkId,
      id: row.id,
      name: row.name,
    })
  } catch (error) {
    console.error(error)
    await connection?.rollback()
    res.status(500).end()
    return
  } finally {
    await connection?.end()
  }
}
