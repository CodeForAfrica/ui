import React from "react";
import PropTypes from "prop-types";

import PostCard from "@/promisetracker/components/PostCard";
import Link from "@/promisetracker/components/Link/Button";
import slugify from "@/promisetracker/utils";

import useStyles from "./useStyles";

function ArticleCard({ classes: classesProp, title, ...props }) {
  const classes = useStyles({ classes: classesProp });

  return (
    // <Link
    //   className={classes.link}
    // >
    <PostCard
      {...props}
      as={`/analysis/articles/${slugify(title)}`}
      component={Link}
      href="/analysis/articles/[slug]"
      title={title}
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
    // </Link>
  );
}

ArticleCard.propTypes = {
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

ArticleCard.defaultProps = {
  children: undefined,
  classes: undefined,
};

export default ArticleCard;
