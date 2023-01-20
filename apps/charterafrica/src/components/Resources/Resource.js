import { RichTypography } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import React from "react";

function Resource({ background, icon, link, name, value, sx }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      position="relative"
      height={{
        xs: "188.5px",
        md: "377px",
      }}
    >
      {/* Background */}
      <Figure
        ImageProps={{
          alt: name,
          src: background.image.src || background.image.url,
          sx: { objectFit: "cover", opacity: 0.3 },
        }}
        sx={{
          alignItems: "center",
          backgroundColor: background.color,
          display: "flex",
          justifyContent: "center",
          height: {
            xs: "188.5px",
            md: "377px",
          },
          width: {
            xs: "100%",
            sm: `calc(100vw / 2)`,
          },
          ...sx,
        }}
      />
      <Box
        display="flex"
        gap={5}
        wrap="nowrap"
        position="absolute"
        // center horizontal & vertical while absolute positioned.
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%,-50%)",
        }}
      >
        <Figure
          ImageProps={{
            alt: name,
            src: icon.src || icon.url,
          }}
          sx={{
            height: 124,
            width: 124,
          }}
        />
        <Box display="flex" flexDirection="column" minWidth="180px">
          <RichTypography
            color="textSecondary"
            html={false}
            variant="numberSmall"
            sx={{ typography: { md: "number" } }}
          >
            {value}
          </RichTypography>
          <RichTypography
            color="textSecondary"
            html={false}
            variant="h6"
            sx={{ typography: { md: "h4" } }}
          >
            {name}
          </RichTypography>
          {link?.label ? (
            <Button
              color="secondary"
              component={link.href ? Link : undefined}
              href={link.href}
              size="small"
              variant="contained"
              sx={{ mt: 2.5, width: "fit-content" }}
            >
              {link.label}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

Resource.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Resource.defaultProps = {
  value: undefined,
};

export default Resource;
