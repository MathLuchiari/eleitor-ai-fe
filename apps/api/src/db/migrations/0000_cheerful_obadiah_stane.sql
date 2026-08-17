CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "test_embeddings" (
	"id" serial PRIMARY KEY NOT NULL,
	"embedding" vector(1536)
);
