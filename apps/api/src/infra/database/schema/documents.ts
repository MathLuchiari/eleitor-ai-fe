import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { governmentPlans } from './government-plans.js';

export const documentTypeEnum = pgEnum('document_type', [
  'GOVERNMENT_PLAN',
  'OFFICIAL_DOCUMENT',
  'OTHER',
]);

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey(),

  governmentPlanId: uuid('government_plan_id')
    .notNull()
    .references(() => governmentPlans.id),

  title: varchar('title', { length: 255 }).notNull(),

  type: documentTypeEnum('type').notNull(),

  content: text('content').notNull(),

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