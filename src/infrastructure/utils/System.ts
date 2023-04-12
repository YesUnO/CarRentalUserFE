type Options = Record<string, string | number | boolean | Object | any[]> | null;
export type UrlEncodedOptions = string | Record<string, string>;

const apiUrl = process.env.API_URL;

async function respond(endpoint: string, options: RequestInit, external?: boolean) {
  const url = external ? endpoint : `${apiUrl}${endpoint}`;
  try {
    const response = await fetch(url, options);
    let data;
    if(response.ok) {
      // TODO: fix reponses wiuthout a body
      data = await response.json();
    }
    return [null, data];
  } catch (error) {
    return [error];
  }
}

export const api = {
  baseURL: apiUrl,
  get: (endpoint: string, external = false) =>
    respond(endpoint, {}, external),
  post: (endpoint: string, options: Options) =>
    respond(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    }),
  put: (endpoint: string, options: Options) =>
    respond(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    }),
  patch: (endpoint: string, options: Options) =>
    respond(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    }),
  delete: (endpoint: string) => respond(endpoint, { method: "DELETE" }),
  postUrlEncoded: (endpoint: string, options: UrlEncodedOptions) =>
    respond(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        typeof options === "string" ? options : options
      ).toString(),
    }),
};