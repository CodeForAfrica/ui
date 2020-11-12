import React from "react";
import PropTypes from "prop-types";

import PostCard from "@/promisetracker/components/PostCard";
import Link from "@/promisetracker/components/Link/Button";

import useStyles from "./useStyles";

function ArticleCard({ classes: classesProp, slug, ...props }) {
  const classes = useStyles({ classes: classesProp });

  return (
    <PostCard
      {...props}
      href={`/analysis/articles/${slug}`}
      component={Link}
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

ArticleCard.propTypes = {
  children: PropTypes.node,
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
  slug: PropTypes.string.isRequired,
};

ArticleCard.defaultProps = {
  children: undefined,
  classes: undefined,
};

export default ArticleCard;
