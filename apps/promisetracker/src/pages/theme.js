import React from "react";

import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Copyright from "@/promisetracker/components/Copyright";
import Page from "@/promisetracker/components/Page";
import TypographySetup from "@/promisetracker/components/TypographySetup";

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

function Theme(props) {
  const classes = useStyles(props);

  return (
    <Page title="Theme" classes={{ section: classes.section }}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Next.js theme setup
          </Typography>
          <TypographySetup />
          <Copyright />
        </Box>
      </Container>
    </Page>
  );
}

export default Theme;
