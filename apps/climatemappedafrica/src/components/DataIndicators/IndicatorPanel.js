import { RichTypography } from "@commons-ui/next";
import { RichText } from "@commons-ui/payload";
import { ButtonBase, Slide } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function IndicatorPanel({ currentItem, onClick, component, ...props }) {
  const Component = component || Slide;
  return (
    <Component {...props}>
      <ButtonBase
        disableRipple
        disableTouchRipple
        sx={({ palette }) => ({
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          color: palette.text.secondary,
        })}
        onClick={onClick}
      >
        {currentItem?.title && (
          <RichTypography sx={{ color: "inherit" }} variant="h3">
            {currentItem.title}
          </RichTypography>
        )}
        {currentItem?.description && (
          <RichText
            sx={{ lineHeight: 30 / 16, textAlign: "initial" }}
            elements={currentItem.description}
          />
        )}
      </ButtonBase>
    </Component>
  );
}

IndicatorPanel.propTypes = {
  component: PropTypes.elementType,
  currentItem: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default IndicatorPanel;
