import { Elysia } from "elysia";
import { env } from "~/env";
import { usersRouter } from "./routers/user";

const app = new Elysia();

app.use(usersRouter);

app.listen(env.PORT);

console.log(`Listening on http://localhost:${env.PORT}`);
