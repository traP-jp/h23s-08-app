// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createConnection } from 'mysql2/promise';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Group {
  id: string,
  name: string,
  created_at: string
}

interface GroupsJoinRequest extends NextApiRequest{
  body: {
    user_id: string,
    group_id: string
  } 
}

export default async function handler(
  req: GroupsJoinRequest,
  res: NextApiResponse<Group[] | null>
) {
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
  });
  
  await connection.execute(
    'INSERT INTO `group_members` (`group_id`, `user_id`) VALUES (?, ?)',
    [req.body.group_id, req.body.user_id]
  );

  res.status(201).end()
}
