import { RichTypography } from "@commons-ui/legacy";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Image from "@/climatemappedafrica/components/Image";

function CategoryHeader({ title, description, icon, ...props }) {
  const classes = useStyles();

  if (!title) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Typography {...props} variant="h3" className={classes.title}>
        {icon && (
          <div className={classes.icon}>
            <Image src={icon} layout="fill" />
          </div>
        )}
        {title}
      </Typography>
      <RichTypography variant="body2" className={classes.description}>
        {description}
      </RichTypography>
    </div>
  );
}

CategoryHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
};

export default CategoryHeader;
