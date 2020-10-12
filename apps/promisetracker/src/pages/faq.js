import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import ContentPage from "@/promisetracker/components/ContentPage";
import FAQ from "@/promisetracker/components/FAQ";

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

function Index({ errorCode, page, actNow, ...props }) {
  const {
    faqs: propsFAQ,
    title: { rendered: pageTitle },
  } = page;

  const faqs = propsFAQ.reduce((arr, e) => arr.concat(e.questions_answers), []);
  const classes = useStyles(props);

  return (
    <Page
      errorCode={errorCode}
      page={page}
      title={pageTitle}
      classes={{ section: classes.section }}
    >
      <FAQ faqs={faqs} classes={{ section: classes.section }} />
      <ActNow {...actNow} classes={{ section: classes.section }} />
    </Page>
  );
}

export async function getStaticProps() {
  const lang = config.DEFAULT_LANG;
  const page = await getSitePage("faq", lang);

  const errorCode = null;
  return {
    props: {
      errorCode,
      page: page.page,
      actNow: page.page.actNow,
    },
  };
}

Index.propTypes = {
  page: PropTypes.shape({
    faqs: PropTypes.shape({}),
    title: PropTypes.shape({
      rendered: PropTypes.string,
    }),
    actNow: PropTypes.shape({}),
  }),
  errorCode: PropTypes.number,
  actNow: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
};
Index.defaultProps = {
  page: undefined,
  errorCode: undefined,
  actNow: undefined,
  subscribe: undefined,
};

export default Index;
