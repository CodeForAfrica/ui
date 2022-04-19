import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import A from "../A";
import RichTypography from "../RichTypography";

function StayInTouch({ support, socialMedia, title }) {
  if (!(socialMedia && socialMedia.length)) {
    return null;
  }

  return (
    <Grid>
      {title && (
        <Grid item xs={12} md="auto">
          <RichTypography>{title}</RichTypography>
        </Grid>
      )}
      <Grid item xs={12} md="auto" container>
        {support && (
          <A href={`mailto:${support.email}`}>
            <img src={support.image.url} alt={support.image.alt} />
          </A>
        )}
        {socialMedia.map((media) => (
          <A key={media.url} href={media.url}>
            <img src={media.image.url} alt={media.image.alt} />
          </A>
        ))}
      </Grid>
    </Grid>
  );
}

StayInTouch.propTypes = {
  socialMedia: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  support: PropTypes.shape({
    email: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  }),
  title: PropTypes.string,
};

StayInTouch.defaultProps = {
  support: undefined,
  title: "Stay in touch with us @ &nbsp;",
};

export default StayInTouch;
