import { useSession } from "next-auth/client";
import React from "react";

import ActNowPage from "@/promisetracker/components/ActNowPage";
import ActNowLoggedInPage from "@/promisetracker/components/ActNowPage/LoggedIn";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

function ActNow(props) {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, show default landing page
  if (!session) {
    return <ActNowPage {...props} />;
  }

  // If session exists, display logged in page
  return <ActNowLoggedInPage {...props} />;
}

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const backend = backendFn();
  const site = await backend.sites().current;
  if (!site.actNowEnabled) {
    return {
      notFound: true,
    };
  }

  const promises = await backend.promises().all;

  const page = await wp().pages({ slug: "act-now", locale }).first;
  const { actNow = {} } = page;

  const languageAlternates = _.languageAlternates("/act-now");
  actNow.url = process.env.ACTNOW_URL ?? null;

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Token ${process.env.ACTNOW_API_KEY}`,
  });
  const actnowSummary = await fetch(`${actNow.url}/v1/`, {
    method: "GET",
    headers,
  }).then(async (response) => response.json());
  actNow.summary = actnowSummary?.summary;

  return {
    props: {
      ...page,
      ...site,
      actNow,
      languageAlternates,
      promises,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default ActNow;
