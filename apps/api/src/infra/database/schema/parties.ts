import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const parties = pgTable('parties', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  acronym: varchar('acronym', { length: 20 }).notNull().unique(),
  number: integer('number').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});