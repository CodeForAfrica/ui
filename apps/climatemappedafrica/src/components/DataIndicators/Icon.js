import { ButtonBase, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function Icon({ item, handleIconClick, currentItemIndex, index, ...props }) {
  const classes = useStyles(props);
  const { title, image } = item;

  return (
    <ButtonBase onClick={handleIconClick} className={classes.iconRoot}>
      <div className={classes.image}>
        <Image src={image} layout="fill" />
      </div>
      <Typography className={classes.text}>{title}</Typography>
    </ButtonBase>
  );
}

Icon.propTypes = {
  handleIconClick: PropTypes.func,
  currentItemIndex: PropTypes.number,
  index: PropTypes.number,
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    hover: PropTypes.string,
  }),
};

export default Icon;
