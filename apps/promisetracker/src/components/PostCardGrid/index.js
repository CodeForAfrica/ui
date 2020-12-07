import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import H1 from "@/promisetracker/components/H1";
import PostCard from "@/promisetracker/components/PostCard";

import useStyles from "./useStyles";

function PostCardGrid({ children, component, items, title, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const Card = component || PostCard;

  return (
    <Section
      title={title}
      titleProps={{ component: H1 }}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      {children}
      {items?.length > 0 && (
        <Grid container className={classes.cardGrid}>
          {items.map((card, i) => (
            <Grid
              key={card.title}
              item
              xs={12}
              lg={4}
              className={clsx(classes.cardGridItem, {
                [classes.row]: (!isDesktop && i > 0) || i > 2,
              })}
            >
              <Card {...card} />
            </Grid>
          ))}
        </Grid>
      )}
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
