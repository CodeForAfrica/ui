import qs from "qs";

export class FetchApi {
  headers = {
    "Content-Type": "application/json",
  };

  token = "";

  email = process.env.NEXT_PUBLIC_APP_AUTH_EMAIL;

  password = process.env.NEXT_PUBLIC_APP_AUTH_PASSWORD;

  constructor(headers) {
    if (headers) {
      this.headers = headers;
      return;
    }
    this.authenticate();
  }

  async authenticate() {
    const data = { email: this.email, password: this.password };
    const res = await this.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users/login`,
      { data },
      false
    );
    this.token = res.token;
    this.headers = {
      "Content-Type": "application/json",
      Cookie: `payload-token=${res.token}`,
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

  async post(url, args, authenticate = true) {
    if (authenticate && !this.token) {
      await this.authenticate();
    }
    return this.fetchFunc(url, { ...args, method: "POST" });
  }

  async get(url, args) {
    if (!this.token) {
      await this.authenticate();
    }
    return this.fetchFunc(url, { ...args, method: "GET" });
  }
}

const fetchApi = new FetchApi();

export default fetchApi;
