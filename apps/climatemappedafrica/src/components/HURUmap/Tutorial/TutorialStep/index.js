import RichTypography from "@commons-ui/core/RichTypography";
import { Grid, Typography, IconButton, Avatar } from "@mui/material";
import { useTour } from "@reactour/tour";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import CloseIcon from "@/climatemappedafrica/assets/icons/close.svg";

function TutorialStep({ description, title, image, selector, ...props }) {
  const classes = useStyles(props);
  const { setIsOpen, currentStep } = useTour();
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.header}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography
            id={`tutorial-title-${currentStep}`}
            className={classes.title}
            variant="h4"
          >
            {title}
          </Typography>
        </Grid>
        {handleClose && (
          <Grid item>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={5} container wrap="nowrap">
          <Grid item>
            <Avatar className={classes.currentStep}>
              <Typography color="textSecondary" variant="h3">
                {currentStep + 1}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <RichTypography className={classes.description}>
              {description}
            </RichTypography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image width={376} height={325} src={image} />
        </Grid>
      </Grid>
    </div>
  );
}

TutorialStep.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  onClose: PropTypes.func,
  title: PropTypes.string,
  selector: PropTypes.string,
};

export default TutorialStep;
