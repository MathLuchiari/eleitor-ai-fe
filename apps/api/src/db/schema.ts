import {
  integer,
  pgTable,
  serial,
  vector,
} from "drizzle-orm/pg-core";

export const testEmbeddings = pgTable("test_embeddings", {
  id: serial("id").primaryKey(),
  embedding: vector("embedding", {
    dimensions: 1536,
  }),
});