import { Elysia } from "elysia";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "process";
import { users } from "./schema";
import { ZodError } from "zod";
import { eq, sql } from "drizzle-orm";
import { insertUserSchema } from "./validators";

const app = new Elysia();

const connection = await mysql.createConnection({
  uri: env.DATABASE_URL!,
});

const db = drizzle(connection, {
  mode: "default",
  schema: { users },
});

app.get("/users", async () => {
  const res = await db.query.users.findMany();

  return res;
});

app.get("/users/:id", async ({ params: { id } }) => {
  const res = await db.query.users.findFirst({ where: eq(users.id, +id) });

  return res;
});

app.post("/users", async ({ body }) => {
  try {
    const data = insertUserSchema.parse(body);

    await db.insert(users).values(data);

    return new Response();
  } catch (e) {
    if (e instanceof ZodError) return new Error("Wrong data's been provided.");
  }
});

app.put("/users/:id", async ({ body, params: { id } }) => {
  try {
    const data = insertUserSchema.parse(body);
    const parsedId = +id;

    await db.update(users).set(data).where(eq(users.id, parsedId));

    return new Response();
  } catch (e) {
    if (e instanceof ZodError) return new Error("Wrong data's been provided.");

    return e;
  }
});

app.patch("/users/:id", async ({ body, params: { id } }) => {
  try {
    const data = insertUserSchema.partial().parse(body);
    const parsedId = +id;

    await db.update(users).set(data).where(eq(users.id, parsedId));

    return new Response();
  } catch (e) {
    if (e instanceof ZodError) return new Error("Wrong data's been provided.");

    return e;
  }
});

app.delete("/users/:id", async ({ params: { id } }) => {
  try {
    await db.delete(users).where(eq(users.id, +id));

    return new Response();
  } catch (e) {
    if (e instanceof ZodError) return new Error("Wrong data's been provided.");

    return e;
  }
});

app.listen(8080);

console.log(`Listening on http://localhost:${app.server!.port}`);
