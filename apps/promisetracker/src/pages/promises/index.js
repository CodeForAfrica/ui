import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import Promises from "@/promisetracker/components/Promises";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";

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
    <Page title="Promises" classes={{ section: classes.section }}>
      <Promises
        items={Array(6).fill({
          date: "2019-08-10",
          description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
          image: promiseImage,
          status: {
            color: "#FFB322",
            textColor: "#202020",
            title: "delayed",
          },
          title: "Codification of national sports and athletics law",
        })}
        title="Promises"
        classes={{
          section: classes.section,
        }}
      />

      <ActNow
        classes={{
          section: classes.section,
        }}
      />
      <Subscribe
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

export default Index;
