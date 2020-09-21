import React from "react";

import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Page from "@/promisetracker/components/Page";

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

function Articles(props) {
  const classes = useStyles(props);

  return (
    <Page title="Articles | Analysis" classes={{ section: classes.section }}>
      <Container maxWidth="sm">
        <Box my={4}>Articles Page</Box>
      </Container>
    </Page>
  );
}

export default Articles;
