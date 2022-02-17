import serverFn from "@/promisetracker/lib/server";

/**
 * Load fact checks stories from PesaCheck site.
 */
function actnow(site) {
  const server = serverFn(site);

  const ACTNOW_URL = server.env("ACTNOW_URL");

  async function createAccount(user) {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.ACTNOW_API_KEY}`,
    });
    const response = await fetch(`${process.env.ACTNOW_URL}/v1/accounts/`, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });
    return response.json();
  }

  async function loginUser(user) {
    const headers = new Headers({
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    });
    const body = new URLSearchParams({
      grant_type: "password",
      ...user,
      client_id: process.env.ACTNOW_CLIENT_ID,
      client_secret: process.env.ACTNOW_CLIENT_SECRET,
    });
    const response = await fetch(`${process.env.ACTNOW_URL}/o/token/`, {
      method: "POST",
      headers,
      body: body.toString(),
    });
    return response.json();
  }

  async function getPetitions() {
    const url = `${ACTNOW_URL}/v1/petitions/?format=json`;
    const response = await fetch(url);
    const petitions = (await response.json()) || [];

    // TODO(kilemensi): Remove hard-coded status once implemented in actNOW
    return petitions.map((petition) => ({ ...petition, status: "closed" }));
  }

  async function getPetition(id) {
    const url = `${ACTNOW_URL}/v1/petitions/${id}/?format=json`;
    const response = await fetch(url);
    const petition = (await response.json()) || [];

    return petition;
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
      };
    },
    petitions: () => {
      return {
        get list() {
          return (async () => {
            return getPetitions();
          })();
        },
      };
    },
    petition: (id) => {
      return {
        get lists() {
          return (async () => {
            return getPetition(id);
          })();
        },
      };
    },
  };

  return api;
}

export default actnow;
