import { pgTable, serial, varchar, smallint } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  age: smallint("age").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
});
