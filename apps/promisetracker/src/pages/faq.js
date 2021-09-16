import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import ContentPage from "@/promisetracker/components/ContentPage";
import FAQ from "@/promisetracker/components/FAQ";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  section: {
    padding: `0 ${typography.pxToRem(23)}`,
    margin: 0,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: 0,
      margin: "0 auto",
      width: typography.pxToRem(widths.values.lg),
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function FaqPage({
  actNow,
  actNowEnabled,
  faqs,
  footer,
  navigation,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <ContentPage
      {...props}
      footer={footer}
      navigation={navigation}
      classes={{ section: classes.section, footer: classes.footer }}
      content={<FAQ items={faqs} />}
      contentProps={{
        lg: 8,
      }}
    >
      {actNowEnabled ? (
        <ActNow
          {...actNow}
          classes={{
            section: classes.section,
          }}
        />
      ) : null}
    </ContentPage>
  );
}

FaqPage.propTypes = {
  actNow: PropTypes.shape({}),
  actNowEnabled: PropTypes.bool,
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  faqs: PropTypes.arrayOf(PropTypes.shape({})),
};

FaqPage.defaultProps = {
  actNow: undefined,
  actNowEnabled: undefined,
  footer: undefined,
  navigation: undefined,
  faqs: undefined,
};

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const backend = backendFn();
  const site = await backend.sites().current;
  const page = await wp().pages({ slug: "faq", locale }).first;
  const faqs = page.faqs
    .reduce((arr, e) => arr.concat(e.questions_answers), [])
    .map((faq) => ({ title: faq.question, summary: faq.answer }));
  const languageAlternates = _.languageAlternates("/faq");

  return {
    props: {
      ...page,
      ...site,
      faqs,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default FaqPage;
