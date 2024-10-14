import { RichTypography } from "@commons-ui/core";
import { RichText } from "@commons-ui/payload";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

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
          mb: 1.5,
          ...OverlineProps?.sx,
        }}
      >
        {overline}
      </RichTypography>
      <RichText
        {...TitleProps}
        typographyProps={{
          variant: "h1",
          ...TitleProps?.typographyProps,
        }}
        elements={children}
        sx={{
          "& strong": {
            display: "inline-block",
            font: "inherit",
            position: "relative",
            "&:after": {
              borderBottom: "30px solid",
              borderColor: "primary.main",
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
      />
      <RichText
        {...SubtitleProps}
        typographyProps={{
          variant: "subtitle1",
          sx: (theme) => ({
            textDecorationColor: theme.palette.text.primary,
          }),
          LinkProps: {
            color: "text.primary",
            sx: {
              textDecoration: "underline",
            },
          },
          ...SubtitleProps?.typographyProps,
        }}
        elements={subtitle}
        sx={{
          mt: 2.5,
          ...SubtitleProps?.sx,
        }}
      />
    </Box>
  );
});

Header.propTypes = {
  className: PropTypes.string,
  overline: PropTypes.string,
  subtitle: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Header;
