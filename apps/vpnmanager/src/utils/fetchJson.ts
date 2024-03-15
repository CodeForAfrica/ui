class FetchError extends Error {
  statusCode: number;
  data: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.name = "FetchError";
    this.statusCode = statusCode;
    this.data = data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
  }
}
async function processResponse(response: Response){
  const res = await response.json();
  if (response.status >= 200 && response.status <= 399) {
    return res
  } else {
    throw new FetchError(response.statusText, response.status, res);
  }
}
async function get(url: string, options?: { params?: Record<string, string> }) {
  const query = options?.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : "";
  const response = await fetch(`${url}${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 return processResponse(response)
}

async function _delete(
  url: string,
  options?: { params?: Record<string, string> },
) {
  const query = options?.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : "";
  const response = await fetch(`${url}${query}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return processResponse(response)
}

async function post(
  url: string,
  body: any,
  options?: { params?: Record<string, string> },
) {
  const query = options?.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : "";
  const response = await fetch(`${url}${query}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return processResponse(response)
}

async function put(
  url: string,
  body: any,
  options?: { params?: Record<string, string> },
) {
  const query = options?.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : "";
  const response = await fetch(`${url}${query}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return processResponse(response)
}

export default { get, post, put, delete: _delete };
