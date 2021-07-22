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

function ActNowSummary({ className, summary, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        <Typography variant="h4" className={classes.count}>
          {summary.accounts.count}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2" noWrap>
          REGISTERED CITIZENS
        </Typography>
      </Grid>
      <Grid item xs={1} noWrap>
        <Typography variant="h4" className={classes.count}>
          {summary.petitions.count}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body2">PETITIONS</Typography>
      </Grid>
    </Grid>
  );
}

ActNowSummary.propTypes = {
  className: PropTypes.string,
  summary: PropTypes.shape,
};

ActNowSummary.defaultProps = {
  className: undefined,
  summary: undefined,
};

export default ActNowSummary;
