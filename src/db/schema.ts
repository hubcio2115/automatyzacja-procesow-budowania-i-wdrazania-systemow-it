import { mysqlTable, bigint, varchar, tinyint } from "drizzle-orm/mysql-core";

// declaring enum in database
export const users = mysqlTable("users", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  age: tinyint("age").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
});
