import React from "react";
import PropTypes from "prop-types";

import PostCard from "@/promisetracker/components/PostCard";

import useStyles from "./useStyles";

function PromiseCard({ classes: classesProp, status, ...props }) {
  const classes = useStyles({ classes: classesProp, status });

  return (
    <PostCard
      {...props}
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

PromiseCard.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    content: PropTypes.string,
    contentRoot: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    descriptionContainer: PropTypes.string,
    media: PropTypes.string,
    root: PropTypes.string,
    share: PropTypes.string,
    title: PropTypes.string,
    titleContainer: PropTypes.string,
  }),
  status: PropTypes.shape({}).isRequired,
};

PromiseCard.defaultProps = {
  children: undefined,
  classes: undefined,
};

export default PromiseCard;
