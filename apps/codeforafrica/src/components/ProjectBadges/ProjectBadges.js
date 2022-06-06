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
      ref={ref}
      {...other}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {badges?.map((item) => (
        <Badge name={item.name} date={item.date} />
      ))}
    </Box>
  );
});

ProjectBadges.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      award: PropTypes.string,
      month: PropTypes.string,
    })
  ),
};

ProjectBadges.defaultProps = {
  badges: undefined,
};
export default ProjectBadges;
