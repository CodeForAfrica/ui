import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "right",
    backgroundColor: "#F7F7F7",
    padding: "1rem",
  },
}));

function ActNowMetrics({ className, ...props }) {
  const classes = useStyles(props);
  const [registeredAccountsCount, setRegisteredAccountsCount] = useState(0);
  const [petitionsCount, setPetitionsCount] = useState(0);

  useEffect(() => {
    fetch(`/api/accounts`, {}).then(async (response) => {
      await response.json().then((data) => {
        setRegisteredAccountsCount(data.summary.accounts.count);
        setPetitionsCount(data.summary.petitions.count);
      });
    });
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        <Typography variant="h4">{registeredAccountsCount}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2">REGISTERED CITIZENS</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h4">{petitionsCount}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">PETITIONS</Typography>
      </Grid>
    </Grid>
  );
}

ActNowMetrics.propTypes = {
  className: PropTypes.string,
};

ActNowMetrics.defaultProps = {
  className: undefined,
};

export default ActNowMetrics;
