import { Elysia } from "elysia";
import { usersRouter } from "./routers/user";
import swagger from "@elysiajs/swagger";

export const app = new Elysia()
  .get("ping", () => {
    return "pong";
  })
  .use(swagger())
  .use(usersRouter);
