import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { users } from "~/db/schema";

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
