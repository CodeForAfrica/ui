import {
  Box,
  ClickAwayListener,
  Grid,
  Dialog,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Icon from "./Icon";
import IndicatorPanel from "./IndicatorPanel";

import bg from "@/climatemappedafrica/assets/images/Mask Group 8.png";
import Image from "@/climatemappedafrica/components/Image";
import RichHeader from "@/climatemappedafrica/components/RichHeader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" timeout={300} ref={ref} {...props} />;
});

function DataIndicators({ indicators, title }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

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
  const panelProps = isDesktop
    ? {
        in: checked,
        mountOnEnter: true,
        unmountOnExit: true,
        component: Slide,
        direction: "left",
        timeout: 300,
        sx: ({ palette, breakpoints, typography }) => ({
          position: "absolute",
          right: 0,
          top: 0,
          backgroundColor: palette.primary.main,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          color: palette.text.secondary,
          ...(breakpoints.up("lg") && {
            width: typography.pxToRem(480),
            height: typography.pxToRem(600),
            padding: `${typography.pxToRem(76)} ${typography.pxToRem(84)}`,
          }),
        }),
      }
    : {
        open: checked,
        onClose: resetItemClick,
        component: Dialog,
        BackdropProps: {
          sx: ({ typography }) => ({
            maxHeight: typography.pxToRem(844),
            backgroundColor: "transparent",
          }),
        },
        TransitionComponent: Transition,
        sx: ({ palette, typography, breakpoints }) => ({
          borderRadius: 0,
          boxShadow: "none",
          position: "absolute",
          backgroundColor: palette.primary.main,
          right: 0,
          top: typography.pxToRem(160),
          overflow: "hidden",
          margin: "auto 0",
          height: typography.pxToRem(528),
          padding: typography.pxToRem(15),
          ...(breakpoints.up("md") && {
            width: typography.pxToRem(355),
            padding: `${typography.pxToRem(50)} ${typography.pxToRem(36)}`,
          }),
        }),
      };

  return (
    <Box
      sx={({ typography, breakpoints }) => ({
        backgroundColor: "#F0F0F0",
        height: typography.pxToRem(672),
        position: "relative",
        ...(breakpoints.up("lg") && {
          height: typography.pxToRem(600),
        }),
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
        sx={({ breakpoints }) => ({
          display: "flex",
          overflow: "hidden",
          ...(breakpoints.up("lg") && {
            position: "relative",
          }),
        })}
      >
        <Box
          sx={({ breakpoints, typography }) => ({
            width: "100%",
            height: typography.pxToRem(672),
            transition: "width 0.3s ease-out",
            ...(breakpoints.up("lg") && {
              height: typography.pxToRem(600),
            }),
            ...(checked && {
              ...(breakpoints.up("md") && { width: "calc(100% - 355px)" }),
              ...(breakpoints.up("lg") && { width: "calc(100% - 480px)" }),
            }),
          })}
        >
          <RichHeader
            TitleProps={{
              sx: {
                width: "100%",
                textAlign: "center",
                padding: `${theme.typography.pxToRem(40)} 0`,
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
                  sx={({ typography, breakpoints }) => ({
                    width: "100%",
                    marginBottom: typography.pxToRem(16),
                    display: "flex",
                    justifyContent: "center",
                    transition: "margin-right 0.3s ease-out",
                    ...(breakpoints.up("lg") && {
                      display: "initial",
                      width: "auto",
                      marginRight: typography.pxToRem(60),
                      "&:last-of-type": {
                        marginRight: 0,
                      },
                    }),

                    ...(checked && {
                      ...(breakpoints.up("lg") && {
                        marginRight: typography.pxToRem(20),
                        "&:last-of-type": {
                          marginRight: 0,
                        },
                      }),
                    }),
                  })}
                >
                  <Icon
                    handleIconClick={() => handleIconClick(index)}
                    item={item}
                    index={index}
                    currentItemIndex={currentItemIndex}
                    handleClickAway={() => resetItemClick()}
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
  title: PropTypes.string,
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
};

export default DataIndicators;
