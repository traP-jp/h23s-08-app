// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDb } from '@/utils/db'
import { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Group {
  id: string
  name: string
  created_at: string
}

interface GroupsJoinRequest extends NextApiRequest {
  body: {
    user_id: string
    group_id: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await POST(req as GroupsJoinRequest, res)
      break
    default:
      res.status(405).end()
      break
  }
}

export async function POST(req: GroupsJoinRequest, res: NextApiResponse) {
  if (!req.body.user_id || !req.body.group_id) {
    res.status(400).end()
    return
  }

  let connection: Connection | undefined
  try {
    connection = await connectDb()

    await connection.execute(
      'INSERT INTO `group_members` (`group_id`, `user_id`) VALUES (?, ?)',
      [req.body.group_id, req.body.user_id]
    )

    res.status(201).end()
  } catch (error) {
    await connection?.rollback()
    console.log(error)
    res.status(500).end()
  } finally {
    await connection?.end()
  }
}
