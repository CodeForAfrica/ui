import { ImageButton } from "@commons-ui/core";
import { Divider, Link, Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Logo = React.forwardRef(function Logo(props, ref) {
  const {
    alt = "Technology | Code for Africa",
    href = "https://codeforafrica.org",
    src,
    ...other
  } = props;
  return (
    <Stack direction="horizontal" gap={1} alignItems="center" ref={ref}>
      <ImageButton
        {...other}
        href={href}
        src={src}
        alt={alt}
        sx={{ ...other?.sx, display: "flex" }}
      />
      <Link
        color="text.primary"
        href="/"
        textTransform="uppercase"
        typography="h3"
        underline="none"
        sx={({ typography }) => ({ fontFamily: typography.fontFamilyMono })}
      >
        Technology
      </Link>
    </Stack>
  );
});

Logo.propTypes = {
  src: PropTypes.string,
};

export default Logo;
