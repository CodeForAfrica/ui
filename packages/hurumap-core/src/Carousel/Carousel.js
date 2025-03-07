import { Box } from "@mui/material";
import { deepmerge } from "@mui/utils";
import PropTypes from "prop-types";
import React from "react";
import RMCarousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

const DEFAULT_RESPONSIVE = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1280,
    },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1279, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

const Carousel = React.forwardRef(function Carousel(props, ref) {
  const { children, className, responsive, DotListProps, ...other } = props;

  return (
    <Box
      sx={(theme) => ({
        ".dotlist": {
          display: "flex",
          justifyContent: "center",
          listStyle: "none",
          paddingTop: theme.typography.pxToRem(40),
          position: "relative",
          "& button": {
            borderColor: theme.palette.divider,
            height: theme.typography.pxToRem(16),
            marginRight: theme.typography.pxToRem(12),
            width: theme.typography.pxToRem(16),
          },
          "& .react-multi-carousel-dot--active button": {
            borderColor: "#A0A0A0",
            background: "#000",
          },
          ...DotListProps?.sx,
        },
      })}
    >
      <RMCarousel
        ref={ref}
        draggable
        swipeable
        responsive={deepmerge(DEFAULT_RESPONSIVE, responsive, { clone: true })}
        arrows={false}
        renderDotsOutside
        showDots
        ssr
        {...other}
        dotListClass="dotlist"
      >
        {children}
      </RMCarousel>
    </Box>
  );
});

Carousel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
  responsive: PropTypes.shape({}),
};

export default Carousel;
