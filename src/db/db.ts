import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from "./schema";
import { env } from "~/env";

const connection = await mysql.createConnection({
  uri: env.DATABASE_URL,
});

// @ts-expect-error, Don't know why `Connection` is not type of `Connection`
export const db = drizzle(connection, {
  mode: "default",
  schema: { users },
});
