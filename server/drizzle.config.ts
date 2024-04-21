import { defineConfig } from 'drizzle-kit';
import config from './src/utils/config';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      config.ENV === 'test'
        ? (config.POSTGRES_TEST_CONNECTION_STRING as string)
        : (config.POSTGRES_CONNECTION_STRING as string),
  },
  verbose: true,
  strict: true,
});
