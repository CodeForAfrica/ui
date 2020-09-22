import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  label: {
    color: palette.secondary.dark,
  },
  root: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  status: {
    marginRight: ".5rem",
    marginBottom: ".4rem",
    padding: ".2rem .5rem",
    border: `.122rem solid ${palette.primary.dark}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
function Status({ statuses, ...props }) {
  const classes = useStyles(props);
  return (
    <>
      <Typography className={classes.label} variant="h6">
        Promises by status
      </Typography>
      <div className={classes.root}>
        {statuses.map((status) => (
          <Typography key={status.name} variant="h6" className={classes.status}>
            {status.name}
          </Typography>
        ))}
      </div>
    </>
  );
}

Status.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  statuses: PropTypes.arrayOf(PropTypes.shape({})),
};

Status.defaultProps = {
  classes: undefined,
  statuses: [
    {
      name: "Completed",
    },

    {
      name: "In Progress",
    },
    {
      name: "Stalled",
    },
    {
      name: "Behind",
    },
    {
      name: "Unrated",
    },
    {
      name: "Unstarted",
    },
  ],
};

export default Status;
