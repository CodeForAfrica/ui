import config from "@/promisetracker/config";
import server from "@/promisetracker/lib/server";

/**
 * Load fact checks stories from PesaCheck site.
 */
function actnow(site) {
  const siteServer = server(site);

  const ACTNOW_URL =
    process.env[`${siteServer.site}ACTNOW_URL`] || config.ACTNOW_URL;

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

  async function getPetitions() {
    const url = `${ACTNOW_URL}/v1/petitions/?format=json`;
    const response = await fetch(url);
    const petitions = (await response.json()) || [];

    // TODO(kilemensi): Remove hard-coded status once implemented in actNOW
    return petitions.map((petition) => ({ ...petition, status: "closed" }));
  }

  const api = {
    accounts: () => {
      return {
        create: (user) => {
          return (async () => {
            return createAccount(user);
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
  };

  return api;
}

export default actnow;
