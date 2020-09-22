import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import Articles from "@/promisetracker/components/Articles";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";

import articleImage from "@/promisetracker/assets/article-thumb-01.png";

const useStyles = makeStyles(
  ({ breakpoints, typography, widths, palette }) => ({
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
    sectionTitle: {
      width: "4.5rem",
      fontWeight: 600,
      marginBottom: 0,
      borderBottom: `.4rem solid ${palette.primary.dark}`,
      paddingRight: "1.5rem",
      marginTop: typography.pxToRem(64),
      [breakpoints.up("lg")]: {
        width: "5rem",
        marginBottom: typography.pxToRem(32),
        marginTop: typography.pxToRem(35),
      },
    },
  })
);

function Index(props) {
  const classes = useStyles(props);

  return (
    <Page>
      <Articles
        items={Array(20).fill({
          date: "2019-08-10",
          description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
          image: articleImage,
          title: "Codification of national sports and athletics law",
        })}
        title="Articles"
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
      />

      <ActNow />
      <Subscribe />
    </Page>
  );
}

export default Index;
