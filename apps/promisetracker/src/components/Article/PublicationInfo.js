import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {
    alignItems: "center",
    display: "flex",
  },
  dateReadTime: {
    color: palette.secondary.dark,
  },
  dateReadTimeContainer: {},
  image: {
    width: typography.pxToRem(61),
    height: typography.pxToRem(39),
    marginRight: "1rem",
    background: (props) =>
      props.image ? `url(${props.image})` : palette.secondary.dark,
  },
  name: {},
}));
function PublicationInfo({ author, date, readTime, classes: classesProp }) {
  const classes = useStyles({ image: author?.image, classes: classesProp });

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div className={classes.dateReadTimeContainer}>
        <Typography className={classes.name} variant="h4">
          {author.name}
        </Typography>
        <Typography className={classes.dateReadTime} variant="h6">
          {date.split(" ").slice(1, 3).join(" ")} - {readTime}
        </Typography>
      </div>
    </div>
  );
}

PublicationInfo.propTypes = {
  classes: PropTypes.shape({
    dateReadTime: PropTypes.string,
    dateReadTimeContainer: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    root: PropTypes.string,
  }),
  author: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  date: PropTypes.string,
  readTime: PropTypes.string,
};

PublicationInfo.defaultProps = {
  classes: undefined,
  author: undefined,
  date: undefined,
  readTime: undefined,
};

export default PublicationInfo;
