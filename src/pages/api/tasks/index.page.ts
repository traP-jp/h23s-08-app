import { connectDb } from '@/utils/db'
import { getAuth } from '@clerk/nextjs/server'
import { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ulid } from 'ulid'

interface User {
  id: string
  clerk_id: string
  name: string
  created_at: string
}

interface Task {
  id: string
  author_id: string
  title: string
  created_at: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    console.log('GET')
    let connection: Connection | undefined
    try {
      connection = await connectDb()

      const [tasks] = await connection.execute('SELECT * FROM tasks')
      res.status(200).json(tasks as Task[])
    } catch (error) {
      await connection?.rollback()
      console.log(error)
      res.status(500).end()
    } finally {
      await connection?.end()
    }
  } else if (req.method === 'POST') {
    console.log('POST')
    let connection: Connection | undefined
    try {
      connection = await connectDb()
      const task: string = req.body.name

      const { userId: clerkId } = getAuth(req)

      const [rows] = await connection.execute(
        'SELECT * FROM `users` WHERE `clerk_id` = ?',
        [clerkId]
      )

      if ((rows as User[]).length === 0) {
        res.status(401).end()
        return
      }

      const user = (rows as User[])[0]

      await connection?.execute(
        'INSERT INTO tasks(id,author_id,title) VALUES(?,?,?)',
        [ulid(), user.id, task]
      )
      res.status(200).end()
    } catch (error) {
      await connection?.rollback()
      console.log(error)
      res.status(500).end()
    } finally {
      await connection?.end()
    }
  } else if (req.method === 'DELETE') {
    let connection: Connection | undefined
    try {
      connection = await connectDb()
      const id = req.body.id
      await connection.execute('DELETE FROM tasks WHERE id = ?', [id])
      res.status(200).end()
    } catch (error) {
      await connection?.rollback()
      console.log(error)
      res.status(500).end()
    } finally {
      await connection?.end()
    }
  }
  if (req.method === 'PUT') {
    console.log('PUT')
    let connection: Connection | undefined
    try {
      connection = await connectDb()
      const task_id: string = req.body.id
      const task: string = req.body.name

      getAuth(req)

      await connection?.execute('UPDATE tasks SET title = ? WHERE id = ?', [
        task,
        task_id,
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
}
