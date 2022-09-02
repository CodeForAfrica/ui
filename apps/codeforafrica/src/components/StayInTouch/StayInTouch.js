import { Link, RichTypography } from "@commons-ui/next";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const IconRoot = styled("img", {
  slot: "Root",
  name: "StayInTouchIcon",
})(({ theme }) => ({
  display: "block",
  height: "37px",
  width: "37px",
  objectFit: "contain",
  [theme.breakpoints.up("md")]: {
    height: "24px",
    width: "24px",
  },
}));

const StayInTouch = React.forwardRef(function StayInTouch(
  { links, sx, title },
  ref
) {
  if (!links?.length) {
    return null;
  }
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={{ xs: "center", md: "flex-start" }}
      sx={{
        ...sx,
      }}
      ref={ref}
    >
      {title?.length ? (
        <Grid item xs={12} md="auto">
          <RichTypography
            sx={{
              mb: { xs: 2.5, md: 0 },
              mr: { md: 4 },
              textAlign: { xs: "center", md: "left" },
            }}
            variant="footerCap"
          >
            {title}
          </RichTypography>
        </Grid>
      ) : null}
      <Grid
        item
        xs={12}
        md="auto"
        container
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {links.map((media) => (
          <Grid
            item
            key={media.href}
            sx={{
              pr: "10px",
              ":last-of-type": {
                pr: 0,
              },
            }}
          >
            <Link
              sx={{
                display: "block",
              }}
              href={media.href}
            >
              <IconRoot src={media.icon.src} alt={media.label} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});

StayInTouch.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      icon: PropTypes.shape({
        src: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  title: PropTypes.string,
};

StayInTouch.defaultProps = {
  links: undefined,
  title: undefined,
};

export default StayInTouch;
