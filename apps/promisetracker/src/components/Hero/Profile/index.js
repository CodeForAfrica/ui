import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import profilePic from "@/promisetracker/assets/hero-sonko.png";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    paddingTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      left: typography.pxToRem(-55),
      paddingTop: 0,
      position: "relative",
    },
  },
  caption: {
    color: "#20202059",
  },
  details: {
    paddingLeft: typography.pxToRem(10),
    minWidth: typography.pxToRem(149),
    [breakpoints.up("lg")]: {
      paddingLeft: 0,
    },
  },
  figure: {
    height: typography.pxToRem(149),
    margin: 0,
    minWidth: typography.pxToRem(149),
    width: typography.pxToRem(149),
    position: "relative",
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(350),
      minWidth: typography.pxToRem(350),
      width: typography.pxToRem(350),
    },
  },
  img: {
    objectFit: "contain",
  },
  title: {
    color: palette.primary.main,
    textTransform: "uppercase",
  },
}));

function Profile({ date, dateLabel, name, photo: photoProp, title, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const flexDirection = useMediaQuery(theme.breakpoints.up("lg"))
    ? "column"
    : "row";
  const photo = photoProp || profilePic?.src;
  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      alignItems="center"
      className={classes.root}
    >
      <figure className={classes.figure}>
        <Image src={photo} layout="fill" alt={name} className={classes.img} />
      </figure>
      <div className={classes.details}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h6" className={classes.caption}>
          {dateLabel} {date}
        </Typography>
      </div>
    </Box>
  );
}

Profile.propTypes = {
  date: PropTypes.string.isRequired,
  dateLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default Profile;
