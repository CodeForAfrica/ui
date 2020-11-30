import React from "react";
import PropTypes from "prop-types";

import PostCard from "@/promisetracker/components/PostCard";
import Link from "@/promisetracker/components/Link/Button";
import Status from "@/promisetracker/components/PromiseStatus";

import useStyles from "./useStyles";

function PromiseCard({
  classes: classesProp,
  status,
  id,
  href,
  title,
  ...props
}) {
  const classes = useStyles({ classes: classesProp, status });

  return (
    <PostCard
      {...props}
      title={title}
      as={href}
      component={Link}
      href="/promises/[...slug]"
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
    >
      <Status {...status} classes={{ root: classes.status }} />
    </PostCard>
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
    status: PropTypes.string,
    share: PropTypes.string,
    title: PropTypes.string,
    titleContainer: PropTypes.string,
  }),
  id: PropTypes.string,
  href: PropTypes.string,
  status: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

PromiseCard.defaultProps = {
  children: undefined,
  classes: undefined,
  id: undefined,
  href: undefined,
};

export default PromiseCard;
