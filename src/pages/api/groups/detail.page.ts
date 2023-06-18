// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDb } from '@/utils/db'
import { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Group {
  id: string
  name: string
  created_at: string
}

interface GroupDetail {
  id: string
  name: string
  created_at: string
  members: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await GET(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<GroupDetail>
) {
  let connection: Connection | undefined
  try {
    connection = await connectDb()

    const query = req.query as { id: string }
    const [groups] = await connection.query(
      'SELECT * FROM `groups` WHERE `id` = ? LIMIT 1',
      [query.id]
    )
    const group = (groups as Group[])[0]

    const [members] = await connection.query(
      'SELECT (user_id) FROM `group_members` WHERE `group_id` = ?',
      [query.id]
    )

    res.status(200).json({
      id: group.id,
      name: group.name,
      created_at: group.created_at,
      members: (members as { user_id: string }[]).map(
        (member: { user_id: string }) => member.user_id
      ),
    })
  } catch (error) {
    await connection?.rollback()
    console.error(error)
    res.status(500).end()
  } finally {
    await connection?.end()
  }
}
