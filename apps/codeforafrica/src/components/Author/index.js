import { Typography, Box } from "@mui/material";
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
      <Typography component="span" variant="body2" sx={{ fontWeight: 400 }}>
        Article by{" "}
      </Typography>
      <Box
        sx={{
          background: "#F6F5F5",
          mx: 2,
          my: { xs: 3, md: 0 },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          component="span"
          variant="body1SemiBold"
          sx={{ mx: 3, my: 0.5 }}
        >
          {author}
        </Typography>
        <Typography component="span" variant="body1" sx={{ mx: 2, my: 0.5 }}>
          {profession}
        </Typography>
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
