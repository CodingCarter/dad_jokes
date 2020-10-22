# dad_jokes

A simple API wrapper for the icanhazdadjoke Dad Jokes API!

## Prelude

Although I wish that I had been able to setup this using typescript interfaces or for all of the responses, I was not able to due to Typescript not running at run-time. Therefore, I have opted for a class solution which allows Typescript to help us with null-checking and other useful features.

## Getting Started

To use the module, first import whatever functions/classes you want to use via the following code:

```ts
import { setDadJokesUserAgent } from "https://deno.land/x/dad_jokes/mod.ts";
```

As you can see, we have a function to set the `User-Agent` head of all requests. This is very important as it allows the icanhazdadjoke api maintainers to prevent spam. At the top of every single program that you are using the api functions, remember to include `setDadJokesUserAgent("dad_jokes module testing")`. Obviously, you should put whatever your project is for or the name of the project inside of the function parameters. An important thing to note is that you need to run the file with the `--allow-net` flag, as we are sending network requests via the fetch api.

## Usage

Now that you know how to get started with this module, let's start to dive into all of the functions that it allows you to use. Let's start with the `getRandomJoke` function. It doesn't have any parameters and returns a `JokeResponse` class. Here is an example of the usage:

```ts
import {
  setDadJokesUserAgent,
  getRandomJoke,
} from "https://deno.land/x/dad_jokes/mod.ts";

setDadJokesUserAgent("dad_jokes module testing");

console.log(await getRandomJoke());
```

And the console output would look something like this:

```console
JokeResponse {
  id: "VDYgib2T7wc",
  joke: "When you have a bladder infection, urine trouble.",
  status: 200,
  message: undefined
}
```

As you can see, we have a `JokeResponse` `id`, `joke`, `status`, and `message`. The `message` would have the value of the `message` that was sent with the response if present. Because there wasn't an error, it's just `undefined`.

We can also fetch a joke based upon it's `id`. Here's an example:

```ts
import {
  setDadJokesUserAgent,
  getJoke,
} from "https://deno.land/x/dad_jokes/mod.ts";

setDadJokesUserAgent("dad_jokes module testing");

console.log(await getJoke("VDYgib2T7wc"));
```

We used the same of the `JokeResponse` that we had gotten before, therefore the console should show the same exact thing as above:

```console
JokeResponse {
  id: "VDYgib2T7wc",
  joke: "When you have a bladder infection, urine trouble.",
  status: 200,
  message: undefined
}
```

Also, you are able to get a random joke for slack messages via the `getRandomSlackJoke` function:

```ts
import {
  setDadJokesUserAgent,
  getRandomSlackJoke,
} from "https://deno.land/x/dad_jokes/mod.ts";

setDadJokesUserAgent("dad_jokes module testing");

console.log(await getRandomSlackJoke());
```

With the following output:

```console
SlackJokeResponse {
  attachments: [
    {
      fallback: "Astronomers got tired watching the moon go around the earth for 24 hours. They decided to call it a ...",
      footer: "<https://icanhazdadjoke.com/j/Qusrcahiib|permalink> - <https://icanhazdadjoke.com|icanhazdadjoke.com...",
      text: "Astronomers got tired watching the moon go around the earth for 24 hours. They decided to call it a ..."
    }
  ],
  response_type: "in_channel",
  username: "icanhazdadjoke"
}
```

Finally, the last api-oriented function is the `getSearchedJokes` function that can take up to 3 parameters, but only requires one. The parameters are the search term (`string`), the paginated page to go to (`number`), and the limit of jokes to show per page (`number`), respectively. Here is an example usage of the `getSearchedJokes` function:

```ts
import {
  setDadJokesUserAgent,
  getSearchedJokes,
} from "https://deno.land/x/dad_jokes/mod.ts";

setDadJokesUserAgent("dad_jokes module testing");

console.log(await getSearchedJokes("mountains"));
```

The output would be the following:

```console
SearchedJokesResponse {
  status: 200,
  message: undefined,
  current_page: 1,
  limit: 20,
  next_page: 1,
  results: [ { id: "UKeiNeVnrc", joke: "Mountains aren't just funny, they are hill areas" } ],
  search_term: "mountains",
  total_jokes: 1,
  total_pages: 1
}
```

As you can tell, we have all of our jokes within the `results` `array`, and the other options are direct children of the `SearchedJokesResponse` object.
