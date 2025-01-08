import { AppBar, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavigation from "./DesktopNavigation";
import ExploreNavigation from "./ExploreNavigation";
import MobileNavigation from "./MobileNavigation";

import Section from "@/climatemappedafrica/components/Section";

function Navigation({ variant, ...props }) {
  return (
    <AppBar
      color="inherit"
      position="sticky"
      sx={({ palette, zIndex }) => ({
        backgroundColor: palette.background.default,
        zIndex: zIndex.modal,
      })}
    >
      <Toolbar
        disableGutters
        sx={({ typography }) => ({
          isplay: "flex",
          alignItems: "center",
          padding: {
            xs: 0,
            lg: `${typography.pxToRem(12)} 0`,
          },
        })}
      >
        <Section>
          {variant?.toLowerCase() === "explore" ? (
            <ExploreNavigation
              variant={variant}
              {...props}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                width: "100%",
              }}
            />
          ) : (
            <DesktopNavigation
              {...props}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                width: "100%",
              }}
            />
          )}
          <MobileNavigation
            {...props}
            sx={{
              display: {
                xs: "flex",
                lg: "none",
              },
              width: "100%",
            }}
          />
        </Section>
      </Toolbar>
    </AppBar>
  );
}

Navigation.propTypes = {
  variant: PropTypes.string,
};

export default Navigation;
