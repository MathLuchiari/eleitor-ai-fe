import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { documents } from './documents.js';

export const sourceTypeEnum = pgEnum('source_type', [
  'OFFICIAL_WEBSITE',
  'TSE',
  'GOVERNMENT',
  'OTHER',
]);

export const sources = pgTable('sources', {
  id: uuid('id').primaryKey(),

  documentId: uuid('document_id')
    .notNull()
    .references(() => documents.id),

  title: varchar('title', { length: 255 }).notNull(),

  url: text('url').notNull(),

  publisher: varchar('publisher', {
    length: 255,
  }).notNull(),

  type: sourceTypeEnum('type').notNull(),

  publishedAt: timestamp('published_at', {
    withTimezone: true,
  }),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});