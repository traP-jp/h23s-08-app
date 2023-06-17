// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createConnection } from 'mysql2/promise';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Group {
  id: string,
  name: string,
  created_at: string
}

interface GroupDetail {
  id: string,
  name: string,
  created_at: string,
  members: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GroupDetail>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }
  
  const query = req.query as { id: string }
  
  const connection = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  
  const [groups] = await connection.query(
    'SELECT * FROM `groups` WHERE `id` = ? LIMIT 1',
    [query.id]
  );
  const group = (groups as Group[])[0];

  const [members] = await connection.query(
    'SELECT (user_id) FROM `group_members` WHERE `group_id` = ?',
    [query.id]
  );

  res.status(200).json({
    id: group.id,
    name: group.name,
    created_at: group.created_at,
    members: (members as { user_id: string }[]).map((member: { user_id: string }) => member.user_id)
  })
}
