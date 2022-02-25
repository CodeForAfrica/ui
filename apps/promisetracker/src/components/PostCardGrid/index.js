import { Section } from "@commons-ui/core";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import H1 from "@/promisetracker/components/H1";
import PostCard from "@/promisetracker/components/PostCard";

function PostCardGrid({ children, component, items, title, ...props }) {
  const classes = useStyles(props);
  const Card = component || PostCard;

  if (!items?.length) {
    return null;
  }
  return (
    <Section
      title={title}
      titleProps={{ component: H1, variant: "h1" }}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      {children}
      <Grid container className={classes.cardGrid}>
        {items.map((card) => (
          <Grid
            key={card.title}
            item
            xs={12}
            lg={4}
            className={clsx(classes.cardGridItem, classes.row)}
          >
            <Card {...card} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

PostCardGrid.propTypes = {
  classes: PropTypes.shape({
    grid: PropTypes.string,
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
    root: PropTypes.string,
  }),
  children: PropTypes.node,
  component: PropTypes.elementType,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

PostCardGrid.defaultProps = {
  classes: undefined,
  children: undefined,
  component: undefined,
  items: undefined,
  title: undefined,
};

export default PostCardGrid;
