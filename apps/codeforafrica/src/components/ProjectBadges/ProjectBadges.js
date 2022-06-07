import { Section } from "@commons-ui/core";
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
    <Section>
      <Box
        ref={ref}
        {...other}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {badges?.map((item) => (
          <Badge
            name={item.name}
            date={item.date}
            sx={{
              margin: { xs: "10px", md: "29px" },
              width: { xs: "100%", md: "201px" },
              height: { xs: "42px", md: "84px" },
              justifyContent: { xs: "flex-start", md: "center" },
              "& span": {
                margin: { xs: "0rem 0.5rem", md: 0 },
              },
            }}
          />
        ))}
      </Box>
    </Section>
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
