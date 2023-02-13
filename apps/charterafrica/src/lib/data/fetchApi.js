import qs from "qs";

export class FetchApi {
  headers = {
    "Content-Type": "application/json",
  };

  token = "";

  constructor(headers) {
    if (headers) {
      this.headers = headers;
      return;
    }
    this.authenticate();
  }

  async authenticate() {
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  fetchFunc = async (url, { method, data, params, ...args }) => {
    const stringifiedQuery = qs.stringify(params || {}, {
      addQueryPrefix: true,
    });
    const queryUrl = `${url}${params ? stringifiedQuery : ""}`;
    const res = await fetch(queryUrl, {
      method,
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
      ...args,
    });
    const response = await res.json();
    return response;
  };

  async post(url, args) {
    return this.fetchFunc(url, { ...args, method: "POST" });
  }

  async get(url, args) {
    return this.fetchFunc(url, { ...args, method: "GET" });
  }
}

const fetchApi = new FetchApi();

export default fetchApi;
