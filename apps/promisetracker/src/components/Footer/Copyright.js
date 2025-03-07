import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ typography }) => ({
  root: {},
  text: {
    marginLeft: typography.pxToRem(11),
  },
  image: {},
}));

function Copyright({
  children,
  typographyProps = { variant: "button" },
  ...props
}) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Image
        alt="Copyright"
        {...props}
        className={classes.image}
        width={19}
        height={19}
      />
      {children && (
        <Typography {...typographyProps} className={classes.text}>
          {children}
        </Typography>
      )}
    </div>
  );
}

Copyright.propTypes = {
  children: PropTypes.node,
  typographyProps: PropTypes.shape({}),
};

export default Copyright;
