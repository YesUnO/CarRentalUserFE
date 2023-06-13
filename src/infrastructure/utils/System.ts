
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
  get: (endpoint: string) => respond(endpoint, {}),
  post: (endpoint: string, options?: Options) =>
    respond(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: options && JSON.stringify(options),
      },
    ),
  put: (endpoint: string, options: Options) =>
    respond(
      endpoint,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      },
    ),
  patch: (endpoint: string, options: Options) =>
    respond(
      endpoint,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      },
    ),
  delete: (endpoint: string) =>
    respond(endpoint, {
      method: "DELETE",
    }),
  bffGet: (endpoint:string) =>
    respond(endpoint, {
      method: "GET",
      headers: { "X-CSRF": "1" }, 
    })
};

export const timeout = (delay: number) => {
  return new Promise(res => setTimeout(res, delay));
}