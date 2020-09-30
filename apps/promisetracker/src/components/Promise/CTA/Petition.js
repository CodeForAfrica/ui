import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(({ typography, palette }) => ({
  title: {
    marginBootom: typography.pxToRem(26),
  },
  button: {
    background: palette.secondary.main,
    padding: "1rem 3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: typography.pxToRem(10),
  },

  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: typography.pxToRem(10),
    width: "100%",
    height: "100%",
  },
}));
function Petition({ title, description, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography variant="h4">{title}</Typography>
      <Typography className={classes.description}>{description}</Typography>
      <div>
        <Button variant="text" className={classes.button}>
          Join A Petition
        </Button>
        <Button variant="text" className={classes.button}>
          Start A Petition
        </Button>
      </div>
    </div>
  );
}

Petition.propTypes = {
  classes: PropTypes.shape({
    itemsContainer: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
};

Petition.defaultProps = {
  classes: undefined,
  title: "Petition",
  description: "Petition with others who care about this promise",
};

export default Petition;
