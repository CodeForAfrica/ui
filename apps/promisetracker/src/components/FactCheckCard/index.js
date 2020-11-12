import React from "react";
import PropTypes from "prop-types";

import PostCard from "@/promisetracker/components/PostCard";
import { A } from "@commons-ui/core";

import useStyles from "./useStyles";

function FactCheckCard({ classes: classesProp, ...props }) {
  const classes = useStyles({ classes: classesProp });

  return (
    <PostCard
      {...props}
      component={A}
      underline="none"
      classes={{
        root: classes.root,
        content: classes.content,
        contentRoot: classes.contentRoot,
        date: classes.date,
        description: classes.description,
        descriptionContainer: classes.descriptionContainer,
        media: classes.media,
        share: classes.share,
        title: classes.title,
        titleContainer: classes.titleContainer,
      }}
    />
  );
}

FactCheckCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    content: PropTypes.string,
    contentRoot: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    descriptionContainer: PropTypes.string,
    link: PropTypes.string,
    media: PropTypes.string,
    root: PropTypes.string,
    share: PropTypes.string,
    title: PropTypes.string,
    titleContainer: PropTypes.string,
  }),
};

FactCheckCard.defaultProps = {
  children: undefined,
  classes: undefined,
};

export default FactCheckCard;
