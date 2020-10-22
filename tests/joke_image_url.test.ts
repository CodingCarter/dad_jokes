import { assertStrictEquals } from "./deps.ts";
import { getJokeImageUrl } from "../mod.ts";

Deno.test("getJokeImageUrl #1", async () => {
  const id = "123";
  assertStrictEquals(
    getJokeImageUrl(id),
    `https://icanhazdadjoke.com/j/${id}.png`
  );
});

Deno.test("getJokeImageUrl #2", async () => {
  const id = "asdf";
  assertStrictEquals(getJokeImageUrl(id, false), `/j/${id}.png`);
});
