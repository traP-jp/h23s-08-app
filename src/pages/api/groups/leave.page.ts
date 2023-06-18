// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createConnection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Group {
  id: string
  name: string
  created_at: string
}

interface GroupsLeaveRequest extends NextApiRequest {
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
      await POST(req as GroupsLeaveRequest, res)
      break
    default:
      res.status(405).end()
      break
  }
}

export async function POST(req: GroupsLeaveRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  if (!req.body.user_id || !req.body.group_id) {
    res.status(400).end()
    return
  }

  const connection = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  await connection.execute(
    'DELETE FROM `group_members` WHERE `group_id` = ? AND `user_id` = ?',
    [req.body.group_id, req.body.user_id]
  )

  res.status(200).end()
}
