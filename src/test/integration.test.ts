import { beforeAll, describe, expect, it } from "bun:test";
import { app } from "~/app";

const API_PORT = 8080;

describe("Elysia", () => {
  beforeAll(() => {
    app.listen(API_PORT);
  });

  it("works", async () => {
    const res = await fetch(`http://localhost:${API_PORT}/ping`);

    if (res.ok) {
      const data = await res.text();

      expect(data).toBe("pong");
    }
  });
});
