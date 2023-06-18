// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createConnection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

interface Group {
  id: string
  name: string
  created_at: string
}

type GetGroupsRequest = NextApiRequest
interface PostGroupsRequest extends NextApiRequest {
  body: {
    name: string
  }
}
interface PutGroupsRequest extends NextApiRequest {
  body: {
    id: string
    name: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await GET(req as GetGroupsRequest, res as NextApiResponse<Group[]>)
      break
    case 'POST':
      await POST(req as PostGroupsRequest, res)
      break
    case 'PUT':
      await PUT(req as PutGroupsRequest, res)
      break
    default:
      res.status(405).end()
      break
  }
}

export async function GET(
  req: GetGroupsRequest,
  res: NextApiResponse<Group[]>
) {
  const connection = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  const [rows] = await connection.execute('SELECT * FROM `groups`')

  res.status(200).json(rows as Group[])
}

export async function POST(req: PostGroupsRequest, res: NextApiResponse) {
  if (!req.body.name) {
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
    'INSERT INTO `groups` (`id`, `name`) VALUES (?, ?)',
    [uuidv4(), req.body.name]
  )

  res.status(201).end()
}

export async function PUT(req: PutGroupsRequest, res: NextApiResponse) {
  if (!req.body.name || !req.body.id) {
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

  await connection.execute('UPDATE `groups` SET `name` = ? WHERE `id` = ?', [
    req.body.name,
    req.body.id,
  ])

  res.status(200).end()
}
