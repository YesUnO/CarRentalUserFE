type Options = Record<string, string | number | boolean | Object | any[]> | null;
type UrlEncodedOptions = string | Record<string, string>;

const apiUrl = process.env.API_URL;

async function respond(
  method: string,
  endpoint: string,
  options: RequestInit,
  external?: boolean
) {
  const url = external ? endpoint : `${apiUrl}${endpoint}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error];
  }
}

export const api = {
  baseURL: apiUrl,
  get: (endpoint: string, external = false) =>
    respond("get", endpoint, {}, external),
  post: (endpoint: string, options: Options) =>
    respond("post", endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    }),
  put: (endpoint: string, options: Options) =>
    respond("put", endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    }),
  patch: (endpoint: string, options: Options) =>
    respond("patch", endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    }),
  delete: (endpoint: string) => respond("delete", endpoint, { method: "DELETE" }),
  postUrlEncoded: (endpoint: string, options: UrlEncodedOptions) =>
    respond("post", endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        typeof options === "string" ? options : options
      ).toString(),
    }),
};