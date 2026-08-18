import {
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { parties } from './parties.js';

export const candidateStatusEnum = pgEnum('candidate_status', [
  'ACTIVE',
  'INACTIVE',
]);

export const candidates = pgTable('candidates', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),

  partyId: uuid('party_id')
    .notNull()
    .references(() => parties.id),

  status: candidateStatusEnum('status')
    .notNull()
    .default('ACTIVE'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});