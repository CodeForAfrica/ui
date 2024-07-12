import {
  Box,
  LinearProgress as MuiLinearProgress,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { typographyClasses } from "@mui/material/Typography";
import React from "react";

const LocationTagRoot = styled(Box)(({ active, theme, variant }) => {
  const { palette, typography } = theme;
  let color = palette.text.primary;
  let backgroundColor = palette.background.default;
  if (variant === "highlight") {
    color = palette.text.secondary;
    const value = active ? 1.0 : 0.8;
    backgroundColor = alpha("#1C2030", value); // #1C2030CC
  }
  return {
    backgroundColor,
    borderRadius: typography.pxToRem(4),
    boxShadow: "0px 3px 6px #00000029",
    color,
    height: typography.pxToRem(36),
    position: "relative",
    minWidth: typography.pxToRem(88),
  };
});

const LinearProgress = styled(MuiLinearProgress)(({ theme }) => {
  const { typography } = theme;

  return {
    borderRadius: typography.pxToRem(4),
    height: typography.pxToRem(18),
    position: "absolute",
    top: typography.pxToRem(-8),
    width: typography.pxToRem(56),
  };
});

const LevelTypography = styled(Typography)(({ theme }) => {
  const { palette, typography } = theme;
  return {
    borderRadius: typography.pxToRem(4),
    color: palette.text.secondary,
    fontWeight: "bold",
    fontSize: typography.pxToRem(7),
    letterSpacing: "0.56px",
    lineHeight: 10 / 7,
    padding: `${typography.pxToRem(4)} ${typography.pxToRem(12)}`,
    position: "absolute",
    textAlign: "center",
    textTransform: "uppercase",
    top: typography.pxToRem(-8),
    [`&.${typographyClasses.colorPrimary}`]: {
      backgroundColor: palette.primary.main,
    },
    [`&.${typographyClasses.colorSecondary}`]: {
      backgroundColor: palette.secondary.main,
    },
  };
});

const LocationTag = React.forwardRef(function LocationTag(
  {
    IconButtonProps,
    LevelTypographyProps,
    NameTypographyProps,
    active,
    code,
    isLoading,
    level,
    name: nameProp,
    onClick,
    variant = "default",
    ...props
  },
  ref,
) {
  if (!(isLoading || (nameProp && level))) {
    return null;
  }
  const handleClick = (e) => {
    if (onClick && !isLoading) {
      onClick(e, { code, level, name: nameProp });
    }
  };

  const name = isLoading ? "…" : nameProp;
  return (
    <LocationTagRoot
      onClick={handleClick}
      display="inline-flex"
      flexDirection="column"
      alignItems="center"
      {...props}
      ref={ref}
    >
      {variant === "marker" ? (
        <IconButton
          size="large"
          sx={(theme) => ({
            position: "absolute",
            top: -68,
            color: "#ebebeb",
            "&:hover": {
              color: "#666666",
              "& .Component108-4_svg__b": {
                stroke: theme.palette.text?.secondary,
              },
            },
            ...IconButtonProps?.sx,
          })}
        />
      ) : null}
      {isLoading ? (
        <LinearProgress />
      ) : (
        <LevelTypography component="h6" {...LevelTypographyProps}>
          {level}
        </LevelTypography>
      )}
      <Typography
        component="span"
        {...NameTypographyProps}
        sx={(theme) => ({
          fontSize: theme.typography.pxToRem(9),
          fontWeight: "bold",
          lineHeight: 13 / 9,
          margin: "auto",
          textTransform: "capitalize",
          ...NameTypographyProps?.sx,
        })}
      >
        {name}
      </Typography>
    </LocationTagRoot>
  );
});

export default LocationTag;
