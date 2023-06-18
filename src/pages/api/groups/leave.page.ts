// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDb } from '@/utils/db'
import { Connection } from 'mysql2/promise'
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
  if (!req.body.user_id || !req.body.group_id) {
    res.status(400).end()
    return
  }

  let connection: Connection | undefined
  try {
    connection = await connectDb()

    await connection.execute(
      'DELETE FROM `group_members` WHERE `group_id` = ? AND `user_id` = ?',
      [req.body.group_id, req.body.user_id]
    )

    res.status(200).end()
  } catch (error) {
    await connection?.rollback()
    console.log(error)
    res.status(500).end()
  } finally {
    await connection?.end()
  }
}
