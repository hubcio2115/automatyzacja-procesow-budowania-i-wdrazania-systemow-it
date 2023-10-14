import type { Config } from "drizzle-kit";
import { env } from "process";

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL!,
  },
} satisfies Config;
