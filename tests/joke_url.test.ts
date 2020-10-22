import { assertStrictEquals } from "./deps.ts";
import { getJokeUrl } from "../mod.ts";

Deno.test("getJokeUrl #1", async () => {
  const id = "123";
  assertStrictEquals(getJokeUrl(id), `https://icanhazdadjoke.com/j/${id}`);
});

Deno.test("getJokeUrl #2", async () => {
  const id = "asdf";
  assertStrictEquals(getJokeUrl(id, false), `/j/${id}`);
});
