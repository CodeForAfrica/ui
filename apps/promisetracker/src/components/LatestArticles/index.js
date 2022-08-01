import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
// import { useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import ArticleCard from "@/promisetracker/components/ArticleCard";
import CtAButton from "@/promisetracker/components/CtAButton";

function LatestArticles({ actionLabel, items, title, ...props }) {
  const classes = useStyles(props);
  // const theme = useTheme();
  // const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!items?.length) {
    return null;
  }
  return (
    <Section
      title={title}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      <div className={classes.root}>
        {/* <ScrollBar
          autoHide
          classes={{ root: classes.scrollBar }}
          height={isDesktop ? 462 : 500}
        > */}
        <div className={classes.cardContainer}>
          {items.map((article) => (
            <ArticleCard key={article.title} {...article} component="div" />
          ))}
        </div>
        {/* </ScrollBar> */}
      </div>
      {actionLabel && (
        <Link href="/analysis/articles" className={classes.link}>
          <CtAButton classes={{ root: classes.cta, button: classes.ctaButton }}>
            {actionLabel}
          </CtAButton>
        </Link>
      )}
    </Section>
  );
}

LatestArticles.propTypes = {
  actionLabel: PropTypes.string,
  classes: PropTypes.shape({
    card: PropTypes.string,
    scrollBar: PropTypes.string,
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
    root: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

LatestArticles.defaultProps = {
  actionLabel: undefined,
  classes: undefined,
  items: undefined,
  title: undefined,
};

export default LatestArticles;
