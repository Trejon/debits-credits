import { Knex, knex } from 'knex';

interface User {
  id: number | string;
  name: string;
  email: string;
  password_digest: string;
  created_at: Date;
  updated_at: Date;
}

export const pg = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
})