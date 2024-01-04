import { type DecoratorBase, Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { insertUserSchema, selectUserSchema } from "../validators";
import { users } from "~/db/schema";
import { type DATABASE } from "~/db/db";

type Decorators = Omit<DecoratorBase, "store"> & { store: { db: DATABASE } };

export const usersRouter = new Elysia<"/users", Decorators>().group(
  "/users",
  (app) =>
    app
      .get("", async ({ store: { db } }) => {
        const query = await db.select().from(users);

        return query;
      })

      .get(
        ":id",
        async ({ set, params: { id }, store: { db } }) => {
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
        async ({ body, store: { db } }) => {
          await db.insert(users).values(body);

          return new Response();
        },
        {
          body: insertUserSchema,
        },
      )

      .put(
        ":id",
        async ({ body, set, params: { id }, store: { db } }) => {
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
        async ({ body, params: { id }, store: { db } }) => {
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
        async ({ set, params: { id }, store: { db } }) => {
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
