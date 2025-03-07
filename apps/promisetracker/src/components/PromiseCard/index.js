import { Link } from "@commons-ui/next";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import PostCard from "@/promisetracker/components/PostCard";
import Status from "@/promisetracker/components/PromiseStatus";

function PromiseCard({ classes: classesProp, status, href, title, ...props }) {
  const classes = useStyles({ classes: classesProp, status });
  const style = {
    background: `linear-gradient(to right, ${status?.color}, ${status?.color}), url("${props.image}") no-repeat center/cover`,
  };

  return (
    <PostCard
      {...props}
      title={title}
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
      style={style}
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
  image: PropTypes.string.isRequired,
  href: PropTypes.string,
  status: PropTypes.shape({
    color: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default PromiseCard;
