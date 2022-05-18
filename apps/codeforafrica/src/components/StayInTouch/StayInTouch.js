import { Link } from "@commons-ui/next";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

import Title from "@/codeforafrica/components/StayInTouchTitle";

const IconRoot = styled("img", {
  slot: "Root",
  name: "StayInTouchIcon",
})(() => ({
  width: "1.375rem",
  height: "1.375rem",
  objectFit: "contain",
}));

const StayInTouch = React.forwardRef(function StayInTouch(
  { children, socialMedia, title = "Stay in touch with us @ &nbsp;", ...props },
  ref
) {
  if (!socialMedia?.length) {
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
          sx={{ margin: "auto", textAlign: { xs: "center", md: "left" } }}
        >
          <Title>Stay in touch:</Title>
        </Grid>
      )}
      <Grid
        justifyContent={{ md: "flex-start", xs: "center" }}
        item
        xs={12}
        md={8}
        container
      >
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
      </Grid>
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
    })
  ),
  title: PropTypes.string,
};

StayInTouch.defaultProps = {
  socialMedia: undefined,
  title: undefined,
};

export default StayInTouch;
