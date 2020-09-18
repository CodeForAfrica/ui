import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Page from "@/promisetracker/components/Page";
import FAQ from "@/promisetracker/components/FAQ";
import ActNow from "@/promisetracker/components/ActNow";

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
}));

function Index(props) {
  const classes = useStyles(props);

  return (
    <Page>
      <FAQ classes={{ section: classes.section }} />
      <ActNow />
    </Page>
  );
}

export default Index;
