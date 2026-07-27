async function fetchJson(resource, init) {
  const response = await fetch(resource, init);

  if (!response.ok) {
    throw new Error(
      `Request to ${resource} failed with status ${response.status}${
        response.statusText ? ` ${response.statusText}` : ""
      }`,
    );
  }

  return response.json();
}

export default fetchJson;
