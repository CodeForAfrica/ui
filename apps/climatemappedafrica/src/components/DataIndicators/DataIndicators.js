import {
  Box,
  ClickAwayListener,
  Grid,
  Dialog,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Icon from "./Icon";
import IndicatorPanel from "./IndicatorPanel";
import useStyles from "./useStyles";

import bg from "@/climatemappedafrica/assets/images/Mask Group 8.png";
import Image from "@/climatemappedafrica/components/Image";
import RichHeader from "@/climatemappedafrica/components/RichHeader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" timeout={300} ref={ref} {...props} />;
});

function DataIndicators({ indicators, title, ...props }) {
  const classes = useStyles(props);
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
        classes: {
          root: classes.slide,
          content: classes.content,
          title: classes.title,
          description: classes.description,
        },
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
        classes: {
          root: classes.dialog,
          paper: classes.dialogPaper,
          content: classes.content,
          title: classes.title,
          description: classes.description,
        },
      };

  return (
    <Box
      sx={({ typography, breakpoints }) => ({
        backgroundColor: "#F0F0F0",
        height: typography.pxToRem(672),
        position: "relative",
        [breakpoints.up("lg")]: {
          height: typography.pxToRem(600),
        },
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
          [breakpoints.up("lg")]: {
            position: "relative",
          },
        })}
      >
        <div
          className={clsx(classes.indicatorsContainer, {
            [classes.slideIn]: checked,
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
                  className={clsx(classes.iconContainer, {
                    [classes.slideInIconContainer]: checked,
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
        </div>
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
