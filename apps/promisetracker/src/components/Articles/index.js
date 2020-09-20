import React from "react";
import PropTypes from "prop-types";

import { Section } from "@commons-ui/core";
import { Grid } from "@material-ui/core";

import ArticleCard from "@/promisetracker/components/ArticleCard";

import useStyles from "./useStyles";

function Articles({ items, title, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <Section
      title={title}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      <Grid container>
        {items.map((article) => (
          <Grid key={article.name} item md={4}>
            <ArticleCard {...article} component="div" />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

Articles.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
    root: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Articles.defaultProps = {
  classes: undefined,
  items: undefined,
  title: undefined,
};

export default Articles;
