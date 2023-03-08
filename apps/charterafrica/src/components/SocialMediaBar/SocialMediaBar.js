import { RichTypography } from "@commons-ui/next";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const SocialMediaBar = React.forwardRef(function SocialMediaBar(props, ref) {
  const { title, children, ...other } = props;
  return (
    <Stack spacing={3} {...other} ref={ref}>
      <RichTypography variant="p3">{title}</RichTypography>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
});

SocialMediaBar.propTypes = {
  title: PropTypes.string.isRequired,
};

SocialMediaBar.defaultProps = {};
export default SocialMediaBar;
