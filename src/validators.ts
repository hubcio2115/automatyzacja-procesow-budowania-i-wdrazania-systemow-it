import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./schema";

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
});
export const selectUserSchema = createSelectSchema(users);
