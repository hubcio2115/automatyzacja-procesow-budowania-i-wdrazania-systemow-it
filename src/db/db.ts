import { drizzle } from "drizzle-orm/postgres-js";
import { users } from "./schema";
import { env } from "~/env";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const migrationClient = postgres(
  `postgres://${env.DB_USER}:${env.DB_PASSWORD}\@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
  { max: 1 },
);

void migrate(drizzle(migrationClient), {
  migrationsFolder: "drizzle",
}).then(() => migrationClient.end());

const queryClient = postgres(
  `postgres://${env.DB_USER}:${env.DB_PASSWORD}\@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
);

export const db = drizzle(queryClient, {
  schema: { users },
});

export type DATABASE = typeof db;
