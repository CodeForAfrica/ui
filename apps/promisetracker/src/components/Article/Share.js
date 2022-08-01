import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import download from "@/promisetracker/assets/share-download.svg?url";
import embed from "@/promisetracker/assets/share-embed.svg?url";
import facebook from "@/promisetracker/assets/share-facebook.svg?url";
import instagram from "@/promisetracker/assets/share-instagram.svg?url";
import sharelink from "@/promisetracker/assets/share-link.svg?url";
import twitter from "@/promisetracker/assets/share-twitter.svg?url";

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
    background: palette.secondary.main,
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
              <Image
                src={platform.image.url}
                alt={platform.image.alt}
                width={24}
                height={24}
              />
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
