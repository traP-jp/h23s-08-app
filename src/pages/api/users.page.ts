// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createConnection } from 'mysql2/promise'
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
  const connection = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  const [rows] = await connection.execute('SELECT * FROM `users`')

  res.status(200).json(rows as User[])
}
