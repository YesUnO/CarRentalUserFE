import { forEach } from "lodash";

type Options = Record<string, string | number | boolean | Object | any[]> | null;
export type UrlEncodedOptions = string | Record<string, string>;

const apiUrl = process.env.API_URL;

async function respond(endpoint: string, options: RequestInit, external?: boolean) {
  const url = external ? endpoint : `${apiUrl}${endpoint}`;
  try {
    const response = await fetch(url, options);
    let data = true;
    for(var pair of response.headers.entries()) {
      console.log(pair);
    }
    console.log(response);
    // if (response.redirected) {
    //   window.location.href = response.url;
    // }
    if(response.ok && !response.redirected) {
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
    respond(endpoint, {
      headers: {"Access-Control-Expose-Headers": "location"}
    }, external),
  post: (endpoint: string, options?: Options) =>
    respond(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: options && JSON.stringify(options),
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