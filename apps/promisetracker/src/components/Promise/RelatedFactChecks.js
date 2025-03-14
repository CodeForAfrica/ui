import { Link } from "@commons-ui/next";
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  date: {
    color: palette.secondary.dark,
  },
  titleDateContainer: {
    alignItems: "start",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    margin: "1rem 0",
    padding: "1rem",
    borderLeft: `.2rem solid ${palette.secondary.main}`,
  },

  title: {},
}));
function RelatedFactChecks({ factChecks, classes: classesProp }) {
  const classes = useStyles({ classes: classesProp });

  if (!factChecks?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      {factChecks.map(({ title, date, href }) => (
        <Link href={href} key={title} className={classes.titleDateContainer}>
          <Typography className={classes.name} variant="h4">
            {title}
          </Typography>
          <Typography className={classes.date} variant="h6">
            {date}
          </Typography>
        </Link>
      ))}
    </div>
  );
}

RelatedFactChecks.propTypes = {
  classes: PropTypes.shape({
    date: PropTypes.string,
    titleDateContainer: PropTypes.string,
    name: PropTypes.string,
    root: PropTypes.string,
  }),
  factChecks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default RelatedFactChecks;
