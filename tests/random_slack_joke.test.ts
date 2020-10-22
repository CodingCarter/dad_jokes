import { assertArrayContains } from "./deps.ts";
import { setDadJokesUserAgent, getRandomSlackJoke } from "../mod.ts";

setDadJokesUserAgent("dad_jokes module testing");

Deno.test("getRandomSlackJoke", async () => {
  const joke = await getRandomSlackJoke();
  assertArrayContains(
    Object.keys(joke),
    ["attachments", "response_type", "username"],
    "`getRandomSlackJoke` should include these properties."
  );
});
