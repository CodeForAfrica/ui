import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import { A } from "@commons-ui/core";

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

  return (
    <div className={classes.root}>
      {factChecks.map(({ title, date, href }) => (
        <A href={href} key={title} className={classes.titleDateContainer}>
          <Typography className={classes.name} variant="h4">
            {title}
          </Typography>
          <Typography className={classes.date} variant="h6">
            {date}
          </Typography>
        </A>
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

RelatedFactChecks.defaultProps = {
  classes: undefined,
  factChecks: [
    { title: "Western Australia by Camper Van", date: "16 April 2020" },
    { title: "Steelhead and Spines in Alaska", date: "16 April 2020" },
    { title: "Arctic Surfing in Lofoten", date: "16 June 2020" },
  ],
};

export default RelatedFactChecks;
