import { env } from "~/env";
import { app } from "./app";
import { db } from "./db/db";

app.state("db", db);
app.listen(env.PORT);

console.log(`Listening on http://localhost:${env.PORT}`);
