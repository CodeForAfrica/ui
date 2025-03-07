import { Box, IconButton, LinearProgress, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";

const LocationTagRoot = styled(Box, {
  shouldForwardProp: (prop) =>
    !["active", "highlight", "variant"].includes(prop),
})(({ active, theme, variant }) => {
  const { palette, spacing, typography } = theme;
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
    padding: `0 ${spacing(1.25)}`,
    position: "relative",
    minWidth: typography.pxToRem(88),
  };
});

const LoadingLinearProgress = styled(LinearProgress)(({ theme }) => {
  const { typography } = theme;

  return {
    borderRadius: typography.pxToRem(4),
    height: typography.pxToRem(18),
    position: "absolute",
    top: typography.pxToRem(-8),
    width: typography.pxToRem(56),
  };
});

const LevelTypography = styled("h6", {
  // component color and not Typography color
  shouldForwardProp: (prop) => !["color"].includes(prop),
})(({ color, theme }) => {
  const { palette, typography } = theme;
  const backgroundColor = palette[color]?.main;

  return {
    backgroundColor,
    borderRadius: typography.pxToRem(4),
    color: palette.text.secondary,
    fontSize: typography.pxToRem(7),
    fontWeight: 600,
    letterSpacing: "0.56px",
    lineHeight: 10 / 7,
    margin: 0,
    padding: `${typography.pxToRem(4)} ${typography.pxToRem(12)}`,
    position: "absolute",
    textAlign: "center",
    textTransform: "uppercase",
    top: typography.pxToRem(-8),
  };
});

const NameTypography = styled("div")(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(9),
    fontWeight: 600,
    lineHeight: 13 / 9,
    margin: "auto",
    textTransform: "capitalize",
  };
});

const LocationTag = React.forwardRef(function LocationTag(
  {
    LevelTypographyProps,
    LoadingLinearProgressProps,
    MarkerProps,
    NameTypographyProps,
    active,
    code,
    color,
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
      active={active}
      alignItems="center"
      display="inline-flex"
      flexDirection="column"
      onClick={handleClick}
      variant={variant}
      {...props}
      ref={ref}
    >
      {variant === "marker" ? (
        <IconButton
          size="large"
          {...MarkerProps}
          sx={(theme) => ({
            color: "#ebebeb",
            position: "absolute",
            top: -68,
            "&:hover": {
              color: "#666666",
              "& .Component108-4_svg__b": {
                stroke: theme.palette.text?.secondary,
              },
            },
            ...MarkerProps?.sx,
          })}
        />
      ) : null}
      {isLoading ? (
        <LoadingLinearProgress {...LoadingLinearProgress} />
      ) : (
        <LevelTypography color={color} {...LevelTypographyProps}>
          {level}
        </LevelTypography>
      )}
      <NameTypography {...NameTypographyProps}>{name}</NameTypography>
    </LocationTagRoot>
  );
});

export default LocationTag;
