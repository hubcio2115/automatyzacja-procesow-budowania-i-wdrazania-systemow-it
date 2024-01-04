import type { Config } from "drizzle-kit";
import { env } from "~/env";

const config: Config = {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: env.DB_HOST,
    port: +env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
  },
};

export default config;
