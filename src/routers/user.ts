import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { insertUserSchema, selectUserSchema } from "~/validators";
import { db } from "~/db/db";
import { users } from "~/db/schema";

export const usersRouter = new Elysia().group("/users", (app) =>
  app
    .get("", async () => {
      const res = await db.select().from(users);

      return res;
    })

    .get(
      ":id",
      async ({ set, params: { id } }) => {
        const res = await db.select().from(users).where(eq(users.id, id));

        if (res.length === 0) {
          set.status = 404;
          return new Response();
        }

        return res;
      },
      {
        params: t.Pick(selectUserSchema, ["id"]),
      },
    )

    .post(
      "",
      async ({ body }) => {
        await db.insert(users).values(body);

        return new Response();
      },
      {
        body: insertUserSchema,
      },
    )

    .put(
      ":id",
      async ({ body, set, params: { id } }) => {
        const user = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.id, id));

        if (user.length === 0) {
          set.status = 404;
          return new Response();
        }

        await db.update(users).set(body).where(eq(users.id, id));

        const res = await db.select().from(users).where(eq(users.id, id));

        return res;
      },
      {
        body: insertUserSchema,
        params: t.Pick(selectUserSchema, ["id"]),
      },
    )

    .patch(
      ":id",
      async ({ body, params: { id } }) => {
        await db.update(users).set(body).where(eq(users.id, +id));

        const res = await db.select().from(users).where(eq(users.id, id));

        return res;
      },
      {
        body: t.Partial(insertUserSchema),
        params: t.Pick(selectUserSchema, ["id"]),
      },
    )

    .delete(
      ":id",
      async ({ set, params: { id } }) => {
        const res = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.id, id));

        if (res.length === 0) {
          set.status = 404;
          return new Response();
        }

        await db.delete(users).where(eq(users.id, id));

        return res[0];
      },
      {
        params: t.Pick(selectUserSchema, ["id"]),
      },
    ),
);
