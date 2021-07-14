import { useSession } from "next-auth/client";
import React from "react";

import ActNowPage from "@/promisetracker/components/ActNowPage";
import ActNowLoggedInPage from "@/promisetracker/components/ActNowPage/LoggedIn";
import check from "@/promisetracker/lib/check";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

function ActNow(props) {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <ActNowPage {...props} />;
  }

  // If session exists, display content
  return <ActNowLoggedInPage {...props} />;
}

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const page = await wp().pages({ slug: "act-now", locale }).first;

  const { actNow = {}, promiseStatuses } = page;
  const checkApi = check({
    promiseStatuses,
    team: "pesacheck-promise-tracker",
  });

  const languageAlternates = _.languageAlternates("/act-now");

  const promises = await checkApi.promises({
    limit: 10000,
    query: `{ "projects": ["2831"] }`,
  });
  actNow.url = process.env.ACTNOW_URL ?? null;

  return {
    props: {
      ...page,
      actNow,
      promises,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default ActNow;
