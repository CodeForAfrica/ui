import { Image } from "@hurumap/next";
import {
  Box,
  Button,
  Grid,
  IconButton,
  SvgIcon as MuiSvgIcon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import CloseIcon from "@/climatemappedafrica/assets/icons/closeBlack.svg";
import slugify from "@/climatemappedafrica/utils/slugify";

function SvgIcon(props) {
  return <MuiSvgIcon {...props} />;
}

function LocationHeader({ icon, level, onClick, parent, title }) {
  if (!title) {
    return null;
  }
  return (
    <Box
      id={slugify(title)}
      sx={({ typography, palette }) => ({
        borderBottom: `solid 1px ${palette.divider}`,
        paddingTop: typography.pxToRem(20),
        position: {
          lg: "relative",
        },
      })}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Typography
                variant="h3"
                sx={({ palette, typography }) => ({
                  borderBottom: ({ variant }) =>
                    `solid 5px ${
                      variant === "secondary"
                        ? palette.secondary.main
                        : palette.primary.main
                    }`,
                  marginBottom: typography.pxToRem(20),
                })}
              >
                {title}
              </Typography>
            </Grid>
            {onClick ? (
              <Grid item>
                <IconButton
                  onClick={onClick}
                  sx={({ typography }) => ({
                    marginLeft: typography.pxToRem(20),
                    maxHeight: typography.pxToRem(44),
                    maxWidth: typography.pxToRem(44),
                    overflow: "hidden",
                    padding: 0,
                  })}
                  size="large"
                >
                  <SvgIcon
                    component={CloseIcon}
                    style={{ fontSize: 44 }}
                    viewBox="0 0 44 44"
                    sx={({ palette }) => ({
                      color: palette.grey.light,
                      "&:hover": {
                        color: "#666",
                        "& .Component_108-1_svg__b": {
                          stroke: palette.common.white,
                        },
                      },
                    })}
                  />
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        {icon ? (
          <Grid item>
            <Button
              variant="contained"
              sx={({ typography, palette }) => ({
                borderRadius: "50%",
                backgroundColor: palette.grey.light,
                width: typography.pxToRem(44),
                height: typography.pxToRem(44),
                minWidth: typography.pxToRem(44),
                boxShadow: "none",
                marginTop: {
                  // quick fix to ensure print button aligns with rich data/pin buttons
                  lg: "10px",
                },
              })}
            >
              <Box
                sx={({ typography }) => ({
                  position: "relative",
                  height: typography.pxToRem(20),
                  minWidth: typography.pxToRem(20),
                })}
              >
                <Image src={icon} layout="fill" />
              </Box>
            </Button>
          </Grid>
        ) : null}
      </Grid>
      {parent && (
        <Typography
          variant="subtitle2"
          sx={({ palette, typography }) => ({
            textTransform: "uppercase",
            borderBottom: `solid 1px ${palette.divider}`,
            paddingBottom: typography.pxToRem(10),
          })}
        >
          {`A ${level} in ${parent}`}
        </Typography>
      )}
    </Box>
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
