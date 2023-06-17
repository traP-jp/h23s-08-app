// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createConnection } from 'mysql2/promise';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string,
  clerk_id: string,
  name: string,
  created_at: string,
}

interface PostUserRequest extends NextApiRequest{
  body: {
    clerk_id: string,
    name: string,
  }
}


export default async function handler(
  req: PostUserRequest,
  res: NextApiResponse<User[]>
) {
  // TODO: handle error
  if (req.method === 'POST') {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'h23s_08'
    });
    
    await connection.execute(
      'INSERT INTO `users` (`id`, `clerk_id`, `name`) VALUES (?, ?, ?)',
      [uuidv4(), req.body.clerk_id, req.body.name]
    );

    // response nothing
    res.status(201).end()
  } else {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'h23s_08'
    });

    const [rows] = await connection.execute(
      'SELECT * FROM `users`'
    );
    // // with placeholder
    // connection.query(
    //   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    //   ['Page', 45],
    //   function(err, results) {
    //     console.log(results);
    //   }
    // );

    res.status(200).json(rows as User[])
  }
}
