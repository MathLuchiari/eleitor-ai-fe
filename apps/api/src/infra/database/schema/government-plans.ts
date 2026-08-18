import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
} from 'drizzle-orm/pg-core';

import { candidates } from './candidates.js';

export const governmentPlans = pgTable('government_plans', {
  id: uuid('id').primaryKey(),

  candidateId: uuid('candidate_id')
    .notNull()
    .references(() => candidates.id),

  title: varchar('title', { length: 255 }).notNull(),

  description: text('description'),

  publishedAt: timestamp('published_at', {
    withTimezone: true,
  }),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});