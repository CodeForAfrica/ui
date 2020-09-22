import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import sharelink from "@/promisetracker/assets/share-link.svg";
import download from "@/promisetracker/assets/share-download.svg";
import embed from "@/promisetracker/assets/share-embed.svg";
import facebook from "@/promisetracker/assets/share-facebook.svg";
import instagram from "@/promisetracker/assets/share-instagram.svg";
import twitter from "@/promisetracker/assets/share-twitter.svg";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    alignItems: "center",
    display: "flex",
    maxWidth: "14rem",
  },
  platform: {
    height: "3.75rem",
    width: "3.75rem",
    borderRadius: "50%",
    margin: ".2rem",
    background: palette.secondary.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      height: "1.25rem",
      width: "1.25rem",
    },
  },
}));
function Share({ platforms, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Grid container>
        {platforms.map((platform) => (
          <Grid key={platform.image.url} item xs={4}>
            <span className={classes.platform}>
              <img src={platform.image.url} alt={platform.image.alt} />
            </span>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Share.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  platforms: PropTypes.arrayOf(PropTypes.shape({})),
};

Share.defaultProps = {
  classes: undefined,
  platforms: [
    {
      image: {
        url: sharelink,
        alt: "",
      },
    },
    {
      image: {
        url: embed,
        alt: "",
      },
    },
    {
      image: {
        url: download,
        alt: "",
      },
    },
    {
      image: {
        url: instagram,
        alt: "",
      },
    },
    {
      image: {
        url: twitter,
        alt: "",
      },
    },
    {
      image: {
        url: facebook,
        alt: "",
      },
    },
  ],
};

export default Share;
