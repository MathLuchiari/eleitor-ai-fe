import "dotenv/config";

import { sql } from "drizzle-orm";

import { db, client } from "../db/index.js";

async function cleanTestDatabase() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error(
      "Database cleanup is only allowed when NODE_ENV=test.",
    );
  }

  const result = await db.execute<{ tablename: string }>(
    sql`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tablename NOT IN ('__drizzle_migrations')
    `,
  );

  const tables = result.map((row) => `"${row.tablename}"`);

  if (tables.length === 0) {
    console.log("No tables found to clean.");
    return;
  }

  await db.execute(
    sql.raw(`
      TRUNCATE TABLE ${tables.join(", ")}
      RESTART IDENTITY
      CASCADE
    `),
  );

  console.log(
    `Test database cleaned: ${tables.length} table(s).`,
  );
}

async function main() {
  try {
    await cleanTestDatabase();
  } catch (error) {
    console.error("Failed to clean test database:", error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

await main();