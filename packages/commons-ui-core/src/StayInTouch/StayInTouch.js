import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichTypography from "@/commons-ui/core/RichTypography";
import SocialMediaIconLink from "@/commons-ui/core/SocialMediaIconLink";

const StayInTouch = React.forwardRef(function StayInTouch(
  { LinkProps, TitleProps, links, sx, title },
  ref,
) {
  if (!links?.length) {
    return null;
  }
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center" }}
      sx={sx}
      ref={ref}
    >
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
      <Stack direction="row" alignItems="center">
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
};

export default StayInTouch;
