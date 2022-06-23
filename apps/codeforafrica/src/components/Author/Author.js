import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import React from "react";

const Author = React.forwardRef(function Author(props, ref) {
  const { name, profession, ...other } = props;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2.5}
      sx={{
        alignItems: "center",
      }}
      {...other}
      ref={ref}
    >
      <RichTypography variant="body2">Article by</RichTypography>
      <Stack
        direction="row"
        spacing={1.25}
        sx={{
          alignItems: "center",
          bgcolor: "background.main",
          p: 1.25,
        }}
      >
        <RichTypography variant="body1SemiBold">{name}</RichTypography>
        <RichTypography variant="body1">{profession}</RichTypography>
      </Stack>
    </Stack>
  );
});

Author.propTypes = {
  name: PropTypes.string,
  profession: PropTypes.string,
};

Author.defaultProps = {
  name: undefined,
  profession: undefined,
};

export default Author;
