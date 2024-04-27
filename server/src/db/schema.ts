import {
  pgTable,
  uuid,
  timestamp,
  varchar,
  text,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const frequencyEnum = pgEnum('frequency', [
  'Daily',
  'Weekly',
  'Monthly',
  'Yearly',
]);

export const littlethings = pgTable('littlethings', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id),
  description: text('description').notNull(),
  littlething: text('littlething').notNull(),
  frequency: frequencyEnum('frequency').notNull(),
  occurrence: integer('occurrence').notNull(),
  completionCount: integer('completion_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
