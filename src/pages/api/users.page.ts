// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAuth } from '@clerk/nextjs/server'
import { createConnection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

interface User {
  id: string
  clerk_id: string
  name: string
  created_at: string
}

interface UserRequest extends NextApiRequest {
  body:
    | undefined
    | {
        name: string
      }
}

export default async function handler(
  req: UserRequest,
  res: NextApiResponse<User[]>
) {
  if (req.method === 'POST') {
    if (!req.body) {
      res.status(400).end()
      return
    }

    const { userId: clerkId } = getAuth(req)

    if (clerkId === null) {
      res.status(401).end()
      return
    }

    const name = req.body.name || ''

    const connection = await createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    })

    await connection.execute(
      'INSERT INTO `users` (`id`, `clerk_id`, `name`) VALUES (?, ?, ?)',
      [uuidv4(), clerkId, name]
    )

    res.status(201).end()
  } else {
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
}
