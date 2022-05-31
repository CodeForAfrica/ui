import { RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Author = React.forwardRef(function Author(props, ref) {
  const { author, profession, ...other } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        py: "40px",
        alignItems: { xs: "center", md: "flex-start" },
      }}
      ref={ref}
      {...other}
    >
      <RichTypography component="span" variant="body2">
        Article by{" "}
      </RichTypography>
      <Box
        sx={{
          bgcolor: "background.main",
          mx: { xs: 0, md: 2 },
          my: { xs: 3, md: 0 },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <RichTypography
          component="span"
          variant="body1SemiBold"
          sx={{ mx: { xs: 0.3, md: 1 }, my: 0.5 }}
        >
          {author}
        </RichTypography>
        <RichTypography
          component="span"
          variant="body1"
          sx={{ mx: { xs: 0.3, md: 1 }, my: 0.5 }}
        >
          {profession}
        </RichTypography>
      </Box>
    </Box>
  );
});

Author.propTypes = {
  author: PropTypes.string,
  profession: PropTypes.string,
};

Author.defaultProps = {
  author: undefined,
  profession: undefined,
};

export default Author;
