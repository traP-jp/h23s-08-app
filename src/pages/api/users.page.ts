// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDb } from '@/utils/db'
import { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'

interface User {
  id: string
  clerk_id: string
  name: string
  created_at: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await GET(req, res as NextApiResponse<User[]>)
      break
    default:
      res.status(405).end()
      break
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse<User[]>) {
  let connection: Connection | undefined
  try {
    connection = await connectDb()

    const [rows] = await connection.execute('SELECT * FROM `users`')

    res.status(200).json(rows as User[])
  } catch (error) {
    await connection?.rollback()
    console.error(error)
    res.status(500).end()
  } finally {
    await connection?.end()
  }
}
