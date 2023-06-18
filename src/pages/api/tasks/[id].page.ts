import { createConnection } from 'mysql2'
import type { NextApiRequest, NextApiResponse } from 'next'

const connection = createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

interface Task {
  id: string
  author_id: string
  title: string
  created_at: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const id = req.body.id
    connection.execute(
      'DELETE FROM tasks WHERE id = ?',
      [id],
      (error, results) => {
        console.log(results)
        res.status(200).end()
      }
    )
  } else if (req.method === 'PUT') {
    const task: Task = req.body.task
    connection.execute(
      'UPDATE tasks SET author_id = ? , title = ?  WHERE id = ?',
      [task.author_id, task.title, task.id],
      (error, results) => {
        console.log(results)
        res.status(200).send(results)
      }
    )
  }
}
