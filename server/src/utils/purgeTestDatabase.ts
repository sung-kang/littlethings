import { littlethings, users } from '../db/schema';
import { db } from '../db/index';
import { sql } from 'drizzle-orm';
import config from '../utils/config';

const purgeTestDatabase = async () => {
  if (config.ENV !== 'test') {
    throw new Error(
      'Do not call this function outside of testing environment.'
    );
  }

  if (config.POSTGRES_TEST_CONNECTION_STRING === undefined) {
    throw new Error(
      'Do not call this function without providing valid test database connection string.'
    );
  }
  await db.delete(littlethings);
  await db.delete(users);
  await db.execute(sql`TRUNCATE TABLE session;`);
};

export default purgeTestDatabase;
