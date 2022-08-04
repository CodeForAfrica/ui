import { Link } from "@commons-ui/next";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import PostCard from "@/promisetracker/components/PostCard";

function ArticleCard({ classes: classesProp, href, ...props }) {
  const classes = useStyles({ classes: classesProp });

  return (
    <PostCard
      {...props}
      component={href ? Link : undefined}
      href={href}
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
  href: PropTypes.string,
};

ArticleCard.defaultProps = {
  children: undefined,
  href: undefined,
  classes: undefined,
};

export default ArticleCard;
