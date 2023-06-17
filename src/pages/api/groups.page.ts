// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createConnection } from 'mysql2/promise';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

interface Group {
  id: string,
  name: string,
  created_at: string
}

interface GroupRequest extends NextApiRequest{
  body: undefined | {
    method: 'GET'
  } | {
    method: 'POST',
    name: string
  } | {
    method: 'PUT'
    id: string,
    name: string
  } 
}


export default async function handler(
  req: GroupRequest,
  res: NextApiResponse<Group[] | null>
) {
  if (!req.body) {
    req.body = {
      method: 'GET'
    }
  }
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT') {
    res.status(405).end()
    return
  }
  req.body.method = req.method

  if (req.method === 'POST') {
    if (req.body.method !== 'POST' || !req.body.name) {
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
      'INSERT INTO `groups` (`id`, `name`) VALUES (?, ?)',
      [uuidv4(), req.body.name]
    );

    res.status(201).end()
  } else if (req.method === 'GET') {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'h23s_08'
    });

    const [rows] = await connection.execute(
      'SELECT * FROM `groups`'
    );

    res.status(200).json(rows as Group[])
  } else if (req.method === 'PUT') {
    if (req.body.method !== 'PUT' || !req.body.name || !req.body.id) {
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
      'UPDATE `groups` SET `name` = ? WHERE `id` = ?',
      [req.body.name, req.body.id]
    );

    res.status(200).end()
  } 
}