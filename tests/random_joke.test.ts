import { assertArrayContains } from "./deps.ts";
import { setDadJokesUserAgent, getRandomJoke } from "../mod.ts";

setDadJokesUserAgent("dad_jokes module testing");

Deno.test("getRandomJoke", async () => {
  const joke = await getRandomJoke();
  assertArrayContains(
    Object.keys(joke),
    ["status", "id", "joke"],
    "`getRandomJoke` should include these properties."
  );
});
