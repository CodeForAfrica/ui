import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const IconRoot = styled("img", {
  slot: "Root",
  name: "StayInTouchIcon",
})(() => ({
  width: "1.375rem",
  height: "1.375rem",
  objectFit: "contain",
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
      justifyContent="center"
      sx={{
        marginTop: "3.125rem",
        ...sx,
      }}
      ref={ref}
    >
      {title?.length ? (
        <Grid item xs={12} md={4}>
          <RichTypography
            sx={{
              mb: { xs: "1.438rem", md: 0 },
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
        md={8}
        container
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {links.map((media) => (
          <Grid item key={media.href}>
            <Link
              sx={{
                display: "inline-block",
                padding: 0,
                paddingRight: "0.625rem",
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
