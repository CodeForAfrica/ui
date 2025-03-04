import { Image, RichHeader } from "@hurumap/next";
import { Box, ClickAwayListener, Grid, Slide } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Icon from "./Icon";
import IndicatorPanel from "./IndicatorPanel";

import bg from "@/climatemappedafrica/assets/images/Mask Group 8.png";

function DataIndicators({ indicators, title }) {
  const [checked, setChecked] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);

  if (!indicators?.length) {
    return null;
  }
  const handleIconClick = (index) => {
    setCurrentItemIndex(index);
    setChecked(true);
  };
  const resetItemClick = () => {
    setChecked(false);
    setCurrentItemIndex(null);
  };
  const currentItem = indicators[currentItemIndex];
  const panelProps = {
    in: checked,
    mountOnEnter: true,
    unmountOnExit: true,
    component: Slide,
    direction: "left",
    timeout: 300,
    sx: ({ palette, typography }) => ({
      position: "absolute",
      right: 0,
      top: { lg: 0, xs: typography.pxToRem(124) },
      backgroundColor: palette.primary.main,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
      color: palette.text.secondary,
      margin: { xs: "auto 0" },
      width: { lg: typography.pxToRem(480), xs: typography.pxToRem(390) },
      height: {
        xs: typography.pxToRem(528),
        lg: typography.pxToRem(600),
      },
      padding: {
        xs: typography.pxToRem(15),
        md: `${typography.pxToRem(50)} ${typography.pxToRem(36)}`,
        lg: `${typography.pxToRem(76)} ${typography.pxToRem(84)}`,
      },
    }),
  };

  return (
    <Box
      sx={({ typography }) => ({
        backgroundColor: "#F0F0F0",
        height: { xs: typography.pxToRem(672), lg: typography.pxToRem(600) },
        position: "relative",
      })}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <Image objectFit="cover" src={bg} layout="fill" />
      </Box>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          position: { lg: "relative" },
        }}
      >
        <Box
          sx={({ typography }) => ({
            width: "100%",
            height: {
              xs: typography.pxToRem(672),
              lg: typography.pxToRem(600),
            },
            transition: "width 0.3s ease-out",
            ...(checked && {
              width: { md: "calc(100% - 355px)", lg: "calc(100% - 480px)" },
            }),
          })}
        >
          <RichHeader
            TitleProps={{
              sx: {
                width: "100%",
                textAlign: "center",
                padding: {
                  xs: "40px 0",
                  lg: "102px 0 80px",
                },
              },
            }}
          >
            {title}
          </RichHeader>
          <ClickAwayListener onClickAway={resetItemClick}>
            <Grid container alignItems="center" justifyContent="center">
              {indicators.map((item, index) => (
                <Grid
                  item
                  key={item.title}
                  sx={({ typography }) => ({
                    marginBottom: typography.pxToRem(16),
                    justifyContent: "center",
                    transition: "margin-right 0.3s ease-out",
                    display: { xs: "flex", lg: "initial" },
                    width: { xs: "100%", lg: "auto" },
                    mr: { lg: 7.5 },
                    "&:last-of-type": {
                      marginRight: 0,
                    },

                    ...(checked && {
                      mr: { lg: 2.5 },
                      "&:last-of-type": {
                        marginRight: 0,
                      },
                    }),
                  })}
                >
                  <Icon
                    handleIconClick={() => handleIconClick(index)}
                    item={item}
                    index={index}
                    currentItemIndex={currentItemIndex}
                    handleClickAway={resetItemClick}
                  />
                </Grid>
              ))}
            </Grid>
          </ClickAwayListener>
        </Box>
        <IndicatorPanel
          {...panelProps}
          onClick={resetItemClick}
          currentItem={currentItem}
        />
      </Box>
    </Box>
  );
}

DataIndicators.propTypes = {
  title: PropTypes.arrayOf(PropTypes.shape({})),
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  ),
};

export default DataIndicators;
