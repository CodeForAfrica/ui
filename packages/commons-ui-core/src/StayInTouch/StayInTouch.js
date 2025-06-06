"use client";

import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichTypography from "@/commons-ui/core/RichTypography";
import SocialMediaIconLink from "@/commons-ui/core/SocialMediaIconLink";

const StayInTouch = React.forwardRef(function StayInTouch(
  {
    LinkProps,
    LinksProps,
    TitleProps,
    links,
    sx,
    title,
    direction = { xs: "column", md: "row" },
    alignItems = { xs: "center" },
  },
  ref,
) {
  if (!links?.length) {
    return null;
  }
  return (
    <Stack direction={direction} alignItems={alignItems} sx={sx} ref={ref}>
      <RichTypography
        variant="overline"
        {...TitleProps}
        sx={{
          mb: { xs: 2.5, md: 0 },
          mr: { md: 4 },
          textAlign: { xs: "center", md: "left" },
          ...TitleProps?.sx,
        }}
      >
        {title}
      </RichTypography>
      <Stack
        direction="row"
        {...LinksProps}
        sx={{
          alignItems: "center",
          ...LinksProps?.sx,
        }}
      >
        {links.map(({ url, ...others }) => {
          return (
            <SocialMediaIconLink
              {...LinkProps}
              {...others}
              href={url}
              key={url}
            />
          );
        })}
      </Stack>
    </Stack>
  );
});

StayInTouch.propTypes = {
  LinkProps: PropTypes.shape({}),
  TitleProps: PropTypes.shape({}),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  ),
  title: PropTypes.string,
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default StayInTouch;
