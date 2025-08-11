import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function query(text: string, params?: any[]) {
  const result = await pool.query(text, params);
  return result.rows;
}