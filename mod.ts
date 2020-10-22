const MODULE_NAME = "dad_jokes";
const BASE_URL = "https://icanhazdadjoke.com";
let USER_AGENT = "dad_jokes deno module";
const DEFAULT_USER_AGENT = USER_AGENT;

export interface AnyObj {
  [key: string]: any;
  [key: number]: any;
}

export class Joke {
  id?: string;
  joke?: string;
  constructor(data: AnyObj) {
    this.id = data.id;
    this.joke = data.joke;
  }
}

export class JokeResponse extends Joke {
  status: number;
  message?: string;
  constructor(data: AnyObj) {
    super(data);
    this.status = data.status;
    this.message = data.message;
  }
}

export class SlackJokeResponse {
  attachments: {
    fallback: string;
    footer: string;
    text: string;
  }[];
  response_type: string;
  username: string;
  constructor(data: AnyObj) {
    this.attachments = data.attachments;
    this.response_type = data.response_type;
    this.username = data.username;
  }
}

export class SearchedJokesResponse {
  status: number;
  message?: string;
  current_page: number;
  limit: number;
  next_page: number;
  results: Joke[];
  search_term: string;
  total_jokes: number;
  total_pages: number;
  constructor(data: AnyObj) {
    this.status = data.status;
    this.message = data.message;
    this.current_page = data.current_page;
    this.limit = data.limit;
    this.next_page = data.next_page;
    this.results = data.results;
    this.search_term = data.search_term;
    this.total_jokes = data.total_jokes;
    this.total_pages = data.total_pages;
  }
}

/**
 * Allows you to set the new user agent that will be used for all dad joke api requests.
 * @param newUserAgent the new value of the user agent
 */
export function setDadJokesUserAgent(newUserAgent: string): void {
  if (newUserAgent === "") {
    console.warn(
      `WARNING(${MODULE_NAME}): A user agent should not be an empty string.`
    );
  }
  USER_AGENT = newUserAgent;
}

/**
 * Gives you the link for the given joke id on the icanhazdadjoke website. Note that the api is not used for this function.
 * @param id the joke id
 * @param optional boolean for if the base url should be included in the returned value (default = true)
 * @returns the given joke id's url
 */
export function getJokeUrl(id: string, includeBaseUrl: boolean = true): string {
  return `${includeBaseUrl ? BASE_URL : ""}/j/${id}`;
}

/**
 * Gives you the image link for the given joke id. Note that the api is not used for this function.
 * @param the id string of the joke
 * @param optional boolean for if the base url should be included in the returned value (default = true)
 * @returns the given joke id's url
 */
export function getJokeImageUrl(
  id: string,
  includeBaseUrl: boolean = true
): string {
  return `${getJokeUrl(id, includeBaseUrl)}.png`;
}

/**
 * Sends a request to the icanhazdadjoke api.
 * @async
 * @param endpoint the string endpoint to send the request to
 * @returns the response data
 */
export async function fetchDadJokeAPI(endpoint: string): Promise<Response> {
  if (USER_AGENT === DEFAULT_USER_AGENT) {
    console.warn(
      `WARNING(${MODULE_NAME}): Please set a user agent for requests using \`setDadJokesUserAgent\`.`
    );
  }
  return await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    },
  });
}

/**
 * Sends a request to the icanhazdadjoke api that is formatted to json.
 * @async
 * @param endpoint the string endpoint to send the request to
 * @returns the response data in json
 */
export async function fetchDadJokeAPIJson(endpoint: string): Promise<AnyObj> {
  const res = await fetchDadJokeAPI(endpoint);
  return await res.json();
}

/**
 * Gives you a random joke.
 * @async
 * @returns JokeResponse the random Joke
 */
export async function getRandomJoke(): Promise<JokeResponse> {
  return new JokeResponse(await fetchDadJokeAPIJson("/"));
}

/**
 * Gives you a joke formatted for slack.
 * @async
 * @returns SlackJokeResponse the slack joke
 */
export async function getRandomSlackJoke(): Promise<SlackJokeResponse> {
  return new SlackJokeResponse(await fetchDadJokeAPIJson("/slack"));
}

/**
 * Gives you the image link for the given joke id. Note that the api is not used for this function.
 * @param id the joke id
 * @returns the given joke id's url
 */
export async function getJokeImageByteArray(id: string): Promise<Uint8Array> {
  const res = await fetchDadJokeAPI(getJokeImageUrl(id, false));
  const data = await res.arrayBuffer();
  return new Uint8Array(data);
}

/**
 * Gives you a joke with the matching id.
 * @async
 * @param id the id of the joke to search for
 * @returns JokeResponse the Joke that matches the given id
 */
export async function getJoke(id: string): Promise<JokeResponse> {
  return new JokeResponse(await fetchDadJokeAPIJson(`/j/${id}`));
}

/**
 * Searches the jokes that match your query.
 * @async
 * @param term the search query
 * @param page the page of paginated results to go to (default = 1)
 * @param limit the maximum number of jokes to show per page (default = 20)
 * @returns SearchedJokesResponse the results from the search query
 */
export async function getSearchedJokes(
  term: string,
  page: number = 1,
  limit: number = 20
): Promise<SearchedJokesResponse> {
  const params = new URLSearchParams({
    term,
    page: page.toString(),
    limit: limit.toString(),
  });
  return new SearchedJokesResponse(
    await fetchDadJokeAPIJson(`/search?${params.toString()}`)
  );
}
