import React from "react";
import PropTypes from "prop-types";

import { ScrollBar, Section } from "@commons-ui/core";

import PostCard from "@/promisetracker/components/PostCard";

import useStyles from "./useStyles";

function LatestArticles({ children, items, title, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <Section
      title={title}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      <div className={classes.root}>
        <ScrollBar autoHide classes={{ root: classes.scrollBar }} height={500}>
          <div className={classes.cardContainer}>
            {items.map((promise) => (
              <PostCard
                key={promise.name}
                {...promise}
                component="div"
                classes={{
                  root: classes.card,
                  descriptionContainer: classes.cardDescriptionContainer,
                }}
              />
            ))}
          </div>
        </ScrollBar>
      </div>
    </Section>
  );
}

LatestArticles.propTypes = {
  children: PropTypes.node,
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
  children: undefined,
  classes: undefined,
  items: undefined,
  title: undefined,
};

export default LatestArticles;
