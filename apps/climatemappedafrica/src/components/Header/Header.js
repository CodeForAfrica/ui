import { RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/climatemappedafrica/components/RichText";

const Header = React.forwardRef(function Header(props, ref) {
  const {
    OverlineProps,
    SubtitleProps,
    TitleProps,
    children,
    overline,
    subtitle,
    sx,
    ...others
  } = props;

  return (
    <Box component="header" {...others} sx={sx} ref={ref}>
      <RichTypography
        variant="overline"
        {...OverlineProps}
        sx={{
          mb: 12,
          ...OverlineProps?.sx,
        }}
      >
        {overline}
      </RichTypography>
      <RichTypography
        variant="h1"
        {...TitleProps}
        sx={{
          "& .highlight": {
            display: "inline-block",
            position: "relative",
            "&:after": {
              borderColor: "primary.main",
              borderBottom: "30 solid",
              bottom: 0,
              content: '""',
              left: 0,
              opacity: 0.1,
              position: "absolute",
              width: "100%",
            },
            ...TitleProps?.sx,
          },
        }}
      >
        {children}
      </RichTypography>
      {typeof subtitle === "string" ? (
        <RichTypography
          variant="subtitle1"
          {...SubtitleProps}
          sx={{
            mt: 20,
            ...SubtitleProps?.sx,
          }}
        >
          {subtitle}
        </RichTypography>
      ) : (
        <RichText
          sx={{
            mt: 20,
            ...SubtitleProps?.sx,
          }}
          elements={subtitle}
        />
      )}
    </Box>
  );
});

Header.propTypes = {
  className: PropTypes.string,
  overline: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Header;
