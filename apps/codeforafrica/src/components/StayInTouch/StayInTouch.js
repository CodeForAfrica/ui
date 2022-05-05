import { Link } from "@commons-ui/next";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

import Title from "./Title";

const LinksRoot = styled(Grid, {
  slot: "Root",
  name: "StayInTouchLinks",
})(({ theme }) => ({
  "& > a": {
    display: "inline-block",
  },
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
    width: "auto",
  },
}));

const IconRoot = styled("img", {
  slot: "Root",
  name: "StayInTouchIcon",
})(() => ({
  width: "1.375rem",
  height: "1.375rem",
  objectFit: "contain",
}));

const StayInTouch = React.forwardRef(function StayInTouch(
  { children, socialMedia, title, ...props },
  ref
) {
  if (!(socialMedia && socialMedia.length)) {
    return null;
  }

  return (
    <Grid
      sx={{
        marginTop: "3.125rem",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
      container
      ref={ref}
      {...props}
    >
      {title && (
        <Grid
          item
          xs={12}
          md={4}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Title title="Stay in touch:" />
        </Grid>
      )}
      <LinksRoot item xs={12} md={8} container>
        {socialMedia.map((media) => (
          <Link
            sx={{
              display: "inline-block",
              padding: 0,
              paddingRight: "0.625rem",
            }}
            key={media.url}
            href={media.url}
          >
            <IconRoot src={media.image.url} alt={media.image.alt} />
          </Link>
        ))}
      </LinksRoot>
    </Grid>
  );
});

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
  title: PropTypes.string,
};

StayInTouch.defaultProps = {
  title: "Stay in touch with us @ &nbsp;",
};

export default StayInTouch;
