import { Pool } from 'pg';
import config from '../utils/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const pool = new Pool({
  connectionString: config.POSTGRES_CONNECTION_STRING,
});

const db = drizzle(pool, { schema });

export { pool, db };
