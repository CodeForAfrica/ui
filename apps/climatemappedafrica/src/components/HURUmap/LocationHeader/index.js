import {
  Button,
  Grid,
  IconButton,
  SvgIcon as MuiSvgIcon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import CloseIcon from "@/climatemappedafrica/assets/icons/closeBlack.svg";
import Image from "@/climatemappedafrica/components/Image";
import slugify from "@/climatemappedafrica/utils/slugify";

function SvgIcon(props) {
  return <MuiSvgIcon {...props} />;
}

function LocationHeader({ icon, level, onClick, parent, title, ...props }) {
  const classes = useStyles(props);

  if (!title) {
    return null;
  }
  return (
    <div id={slugify(title)} className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography variant="h3" className={classes.title}>
                {title}
              </Typography>
            </Grid>
            {onClick ? (
              <Grid item>
                <IconButton
                  onClick={onClick}
                  className={classes.closeButton}
                  size="large"
                >
                  <SvgIcon
                    component={CloseIcon}
                    style={{ fontSize: 44 }}
                    viewBox="0 0 44 44"
                    className={classes.closeButtonIcon}
                  />
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        {icon ? (
          <Grid item>
            <Button variant="contained" className={classes.button}>
              <div className={classes.icon}>
                <Image src={icon} layout="fill" />
              </div>
            </Button>
          </Grid>
        ) : null}
      </Grid>
      {parent && (
        <Typography variant="subtitle2" className={classes.description}>
          {`A ${level} in ${parent}`}
        </Typography>
      )}
    </div>
  );
}

LocationHeader.propTypes = {
  icon: PropTypes.string,
  level: PropTypes.string,
  onClick: PropTypes.func,
  parent: PropTypes.string,
  title: PropTypes.string,
};

export default LocationHeader;
