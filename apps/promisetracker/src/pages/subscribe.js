import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";

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

function Index(props) {
  const classes = useStyles(props);

  return (
    <Page
      title="Subscribe"
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Subscribe classes={{ section: classes.section }} />
      <ActNow classes={{ section: classes.section }} />
    </Page>
  );
}

export default Index;
