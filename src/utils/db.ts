import { Connection, createConnection } from 'mysql2/promise'

export async function connectDb(): Promise<Connection> {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    })
    return connection
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error('Unknown error')
    }
  }
}
