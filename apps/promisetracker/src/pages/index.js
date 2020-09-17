import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import Copyright from "@/promisetracker/components/Copyright";
import TypographySetup from "@/promisetracker/components/TypographySetup";
import Newsletter from "@/promisetracker/components/Newsletter";
import Footer from "@/promisetracker/components/Footer";
import config from "@/promisetracker/config";

import { makeStyles } from "@material-ui/core/styles";

import LatestArticles from "@/promisetracker/components/LatestArticles";
import LatestPromises from "@/promisetracker/components/LatestPromises";
import Page from "@/promisetracker/components/Page";

import articleImage from "@/promisetracker/assets/article-thumb-01.png";
import promiseImage from "@/promisetracker/assets/promise-thumb-01.png";

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
    <>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Next.js theme setup
          </Typography>
          <TypographySetup />
          <Copyright />
        </Box>
      </Container>
      <Newsletter />
      <Footer page={config.page} />
    </>
  );
}

export default Index;
