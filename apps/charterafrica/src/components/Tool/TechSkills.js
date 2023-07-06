import { RichTypography } from "@commons-ui/core";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const TechSkills = React.forwardRef(function TechSkills(props, ref) {
  const { list, title, sx } = props;
  if (!list?.length) {
    return null;
  }
  return (
    <Box sx={sx} ref={ref}>
      <RichTypography variant="p3" color="neutral.dark">
        {title}
      </RichTypography>
      <br />
      {list?.map((skill) => (
        <Button
          variant="contained"
          key={skill.id}
          component="div"
          sx={{
            backgroundColor: "error.main",
            color: "neutral.dark",
            ml: 2,
            mb: 1,
            borderRadius: 1.25,
          }}
        >
          {skill.language}
        </Button>
      ))}
    </Box>
  );
});

TechSkills.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  sx: PropTypes.shape({}),
};

TechSkills.defaultProps = {
  sx: undefined,
  list: undefined,
  title: undefined,
};

export default TechSkills;
