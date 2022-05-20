import { RichTypography } from "@commons-ui/core";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function TeamContent({ title, description }) {
  if (!title || !description) {
    return null;
  }
  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <RichTypography variant="subtitle1" sx={{ paddingTop: "40px" }}>
        {description}
      </RichTypography>
    </>
  );
}

TeamContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

TeamContent.defaultProps = {
  title: undefined,
  description: undefined,
};

export default TeamContent;
