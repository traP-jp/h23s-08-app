// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDb } from '@/utils/db'
import { Connection } from 'mysql2/promise'
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
  let connection: Connection | undefined
  try {
    connection = await connectDb()

    const [rows] = await connection.execute('SELECT * FROM `groups`')

    res.status(200).json(rows as Group[])
  } catch (error) {
    await connection?.rollback()
    console.log(error)
    res.status(500).end()
  } finally {
    await connection?.end()
  }
}

export async function POST(req: PostGroupsRequest, res: NextApiResponse) {
  if (!req.body.name) {
    res.status(400).end()
    return
  }

  let connection: Connection | undefined
  try {
    connection = await connectDb()

    await connection.execute(
      'INSERT INTO `groups` (`id`, `name`) VALUES (?, ?)',
      [uuidv4(), req.body.name]
    )

    res.status(201).end()
  } catch (error) {
    await connection?.rollback()
    console.log(error)
    res.status(500).end()
  } finally {
    await connection?.end()
  }
}

export async function PUT(req: PutGroupsRequest, res: NextApiResponse) {
  if (!req.body.name || !req.body.id) {
    res.status(400).end()
    return
  }

  let connection: Connection | undefined
  try {
    connection = await connectDb()

    await connection.execute('UPDATE `groups` SET `name` = ? WHERE `id` = ?', [
      req.body.name,
      req.body.id,
    ])

    res.status(200).end()
  } catch (error) {
    await connection?.rollback()
    console.log(error)
    res.status(500).end()
  } finally {
    await connection?.end()
  }
}
