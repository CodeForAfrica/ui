import jwtDecode from "jwt-decode";

import serverFn from "@/promisetracker/lib/server";

/**
 * Load fact checks stories from PesaCheck site.
 */
function actnow(site) {
  const server = serverFn(site);

  const ACTNOW_API_KEY = server.env("ACTNOW_API_KEY");
  const ACTNOW_CLIENT_ID = server.env("ACTNOW_CLIENT_ID");
  const ACTNOW_CLIENT_SECRET = server.env("ACTNOW_CLIENT_SECRET");
  const ACTNOW_URL = server.env("ACTNOW_URL");

  async function createAccount(user) {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Token ${ACTNOW_API_KEY}`,
    });
    const response = await fetch(`${ACTNOW_URL}/v1/accounts/`, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });
    return response.json();
  }

  async function fetchToken(url, params) {
    const Authorization = `Basic ${Buffer.from(
      `${ACTNOW_CLIENT_ID}:${ACTNOW_CLIENT_SECRET}`
    ).toString("base64")}`;
    const body = new URLSearchParams({
      grant_type: "password",
      ...params,
    }).toString();
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        Authorization,
      },
      body,
      redirect: "follow",
    };

    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }

  async function loginUser(credentials) {
    const url = new URL("/o/token/", ACTNOW_URL).toString();
    const user = await fetchToken(url, credentials);
    if (user.error) {
      throw new Error(user.error);
    }
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      ...others
    } = user;
    return { accessToken, refreshToken, ...others };
  }

  async function refreshLoggedInUser({ refreshToken: currentRefreshToken }) {
    const params = {
      refresh_token: currentRefreshToken,
      grant_type: "refresh_token",
    };
    const url = new URL("/o/token/", ACTNOW_URL).toString();
    try {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        ...others
      } = await fetchToken(url, params);
      return {
        ...others,
        accessToken,
        exp: jwtDecode(accessToken).exp,
        // Fall back to current refresh token if new one is not available
        refreshToken,
      };
    } catch (error) {
      return null;
    }
  }

  async function getPetitions(query) {
    const url = `${ACTNOW_URL}/v1/petitions/?${`${query}&` || ""}format=json`;
    const response = await fetch(url);
    const petitions = response.ok ? await response.json() : [];

    // TODO(kilemensi): Remove hard-coded status once implemented in actNOW
    return petitions?.map((petition) => ({ ...petition, status: "closed" }));
  }

  async function getPetition(id) {
    const url = `${ACTNOW_URL}/v1/petitions/${id}/?format=json`;
    const response = await fetch(url);
    const petition = (await response.json()) || [];

    return petition;
  }

  async function createPetition(session, data) {
    const url = `${ACTNOW_URL}/v1/petitions/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: data,
      });
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    } catch (error) {
      return error;
    }
  }

  const api = {
    accounts: () => {
      return {
        create: (user) => {
          return (async () => {
            return createAccount(user);
          })();
        },
        login: (user) => {
          return (async () => {
            return loginUser(user);
          })();
        },
        refresh: (token) => {
          return (async () => {
            return refreshLoggedInUser(token);
          })();
        },
      };
    },

    petitions: () => {
      return {
        fetchAll: (queryParam) => {
          return (async () => {
            return getPetitions(queryParam);
          })();
        },
        petition: (id) => {
          return (async () => {
            return getPetition(id);
          })();
        },
        create: (session, data) => {
          return (async () => {
            return createPetition(session, data);
          })();
        },
      };
    },
  };

  return api;
}

export default actnow;
