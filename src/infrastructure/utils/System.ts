
type Options = Record<
  string,
  string | number | boolean | Object | any[]
> | null;
export type UrlEncodedOptions = string | Record<string, string>;
export type ErrorResponse = {
  error: string | undefined;
};
export type ErrorsResponse = {
  errors: string[] | undefined;
};

export type FieldErrorsResponse = {
  errors: {field: string; description: string}[] | undefined;
}

const apiUrl = process.env.API_URL;


async function respond(endpoint: string, options: RequestInit, token?: string) {
  if (!!token) {
    options.headers = {
      ...options.headers,
      Authorization: token,
    };
  }
  const url = `${apiUrl}${endpoint}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      return [data];
    }
    return [null, data];
  } catch (error) {
    return [error];
  }
}

export const api = {
  baseURL: apiUrl,
  get: (endpoint: string, token?: string) => respond(endpoint, {}, token),
  post: (endpoint: string, options?: Options, token?: string) =>
    respond(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: options && JSON.stringify(options),
      },
      token
    ),
  put: (endpoint: string, options: Options, token?: string) =>
    respond(
      endpoint,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      },
      token
    ),
  patch: (endpoint: string, options: Options, token?: string) =>
    respond(
      endpoint,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      },
      token
    ),
  delete: (endpoint: string, token?: string) =>
    respond(endpoint, {
      method: "DELETE",
    }, token),
  postUrlEncoded: (endpoint: string, options: UrlEncodedOptions) =>
    respond(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        typeof options === "string" ? options : options
      ).toString(),
    }),
};

export const timeout = (delay: number) => {
  return new Promise(res => setTimeout(res,delay));
}