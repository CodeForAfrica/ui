import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Badge from "@/codeforafrica/components/Badge";

const ProjectBadges = React.forwardRef(function ProjectBadges(props, ref) {
  const { badges, ...other } = props;

  if (!badges?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        padding: "1rem",
      }}
      ref={ref}
      {...other}
    >
      {badges.map((item) => (
        <Badge
          name={item.name}
          date={item.date}
          sx={{
            margin: { xs: "10px", md: "29px" },
            width: { xs: "100%", md: "359px", lg: "201px" },
            height: { xs: "42px", md: "84px" },
            justifyContent: { xs: "flex-start", md: "center" },
            "& span": {
              margin: { xs: "0rem 0.5rem", md: 0 },
            },
          }}
        />
      ))}
    </Box>
  );
});

ProjectBadges.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};

ProjectBadges.defaultProps = {
  badges: undefined,
};
export default ProjectBadges;
