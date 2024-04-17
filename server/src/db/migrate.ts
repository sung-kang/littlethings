import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { pool } from './index';

const db = drizzle(pool);

const migrateDatabase = async () => {
  await migrate(db, { migrationsFolder: './src/db/migrations' });
};

export default migrateDatabase;
