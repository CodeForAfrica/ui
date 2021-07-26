import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    backgroundColor: "#F7F7F7",
    padding: "1rem",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  count: {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
}));

function ActNowSummary({ summary, titles, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        <Typography variant="h4" className={classes.count}>
          {summary.accounts.count}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4" noWrap>
          {titles.citizens}
        </Typography>
      </Grid>
      <Grid item xs={1} noWrap>
        <Typography variant="h4" className={classes.count}>
          {summary.petitions.count}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h4">{titles.petitions}</Typography>
      </Grid>
    </Grid>
  );
}

ActNowSummary.propTypes = {
  summary: PropTypes.shape({
    petitions: PropTypes.shape({
      count: PropTypes.number.isRequired,
    }),
    accounts: PropTypes.shape({
      count: PropTypes.number.isRequired,
    }),
  }),
  titles: PropTypes.shape({
    citizens: PropTypes.string.isRequired,
    petitions: PropTypes.string.isRequired,
  }),
};

ActNowSummary.defaultProps = {
  summary: undefined,
  titles: undefined,
};

export default ActNowSummary;
