import { RichText } from "@commons-ui/payload";
import { Image } from "@hurumap/next";
import { Grid, Typography, IconButton, Avatar, Box } from "@mui/material";
import { useTour } from "@reactour/tour";
import PropTypes from "prop-types";
import React from "react";

import CloseIcon from "@/climatemappedafrica/assets/icons/close.svg";

function TutorialStep({ description, title, image }) {
  const { setIsOpen, currentStep } = useTour();
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={({ typography }) => ({
        paddingLeft: typography.pxToRem(34),
        paddingTop: typography.pxToRem(25),
        paddingRight: typography.pxToRem(39),
        width: typography.pxToRem(964),
      })}
    >
      <Grid
        sx={({ typography }) => ({
          marginBottom: typography.pxToRem(48),
        })}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography id={`tutorial-title-${currentStep}`} variant="h4">
            {title}
          </Typography>
        </Grid>
        {handleClose && (
          <Grid item>
            <IconButton aria-label="close" onClick={handleClose} size="large">
              <CloseIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={5} container wrap="nowrap">
          <Grid item>
            <Avatar
              sx={({ palette, typography }) => ({
                background: palette.primary.main,
                width: typography.pxToRem(48),
                height: typography.pxToRem(48),
              })}
            >
              <Typography color="textSecondary" variant="h3">
                {currentStep + 1}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <RichText
              elements={description}
              sx={(theme) => ({
                marginLeft: theme.typography.pxToRem(16),
                width: theme.typography.pxToRem(278),
                lineHeight: 30 / 16,
                "& p": {
                  marginTop: 0,
                  marginBottom: theme.typography.pxToRem(32),
                },
              })}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image width={376} height={325} src={image} />
        </Grid>
      </Grid>
    </Box>
  );
}

TutorialStep.propTypes = {
  description: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.string,
  title: PropTypes.string,
};

export default TutorialStep;
