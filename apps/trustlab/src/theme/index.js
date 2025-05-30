import { createTheme } from "@commons-ui/core";
import { buttonClasses } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { Barlow, Open_Sans as OpenSans } from "next/font/google";

import { neutral, primary } from "@/trustlab/colors";

const barlow = Barlow({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = OpenSans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const FONT_FAMILY_PRIMARY = barlow.style.fontFamily;
const FONT_FAMILY_SECONDARY = openSans.style.fontFamily;

const palette = {
  mode: "light",
  primary: { main: primary[500] },
  neutral: { light: neutral[200], main: neutral[500], dark: neutral[900] },
  error: { main: "#FF0000" },
  warning: { main: "#FEFF05" },
  success: { main: "#34D399" },
  text: { primary: "#000000", secondary: "#FFFFFF" },
  background: {
    default: neutral[100],
  },
  action: { focusOpacity: 0 },
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1152,
    lg: 1440,
    xl: 1920,
  },
};

function initializeTypographyVariant(
  fontSize,
  lineHeight,
  fontWeight = 400,
  fontFamily = FONT_FAMILY_SECONDARY,
  others = undefined,
) {
  return {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight: lineHeight / fontSize,
    ...others,
  };
}

const theme = createTheme({
  palette,
  breakpoints,
  contentWidths: {
    values: {
      sm: 728,
      md: 1024,
      lg: 1240,
      xl: 1240,
    },
    unit: "px",
  },
  typography: {
    fontFamily: FONT_FAMILY_SECONDARY,
    display1: initializeTypographyVariant(72, 64, 800, FONT_FAMILY_PRIMARY),
    display2: initializeTypographyVariant(64, 64, 800, FONT_FAMILY_PRIMARY),
    h1: initializeTypographyVariant(32, 40, 700, FONT_FAMILY_PRIMARY),
    h2: initializeTypographyVariant(24, 32, 700, FONT_FAMILY_PRIMARY),
    h3: initializeTypographyVariant(18, 24, 700, FONT_FAMILY_PRIMARY),
    button: initializeTypographyVariant(18, 24, 900, FONT_FAMILY_PRIMARY),
    subheading1: initializeTypographyVariant(24, 32, 600, FONT_FAMILY_PRIMARY),
    subheading2: initializeTypographyVariant(18, 24, 600, FONT_FAMILY_PRIMARY),
    p1: initializeTypographyVariant(18, 24),
    p2: initializeTypographyVariant(14, 20),
    p3: initializeTypographyVariant(12, 16),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: "p1",
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          subheading1: "h6",
          subheading2: "h6",
          p1: "p",
          p2: "p",
          p3: "p",
        },
      },
    },
  },
});

// deepmerge font-size so that we don't overide other settings such as
// font-family set above
deepmerge(
  theme.typography,
  {
    button: {
      ...theme.typography.button,
      textTransform: "uppercase",
    },
  },
  { clone: false },
);

deepmerge(
  theme.components,
  {
    MuiButton: {
      styleOverrides: {
        root: {
          ...theme.typography.button,
          boxShadow: "none",
          border: "1px solid",
          borderRadius: "none",
          backgroundColor: "#ffffff",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#F6F5F5",
          },
          "&:active": {
            backgroundColor: "#FFFFFF",
          },
          [`&.${buttonClasses.disabled}`]: {
            backgroundColor: "#E6E6E6",
            color: "#888888",
            borderColor: "#000000",
          },
        },
        containedPrimary: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          "&:active": {
            backgroundColor: "#A0A0A0",
          },
          "&:hover": {
            backgroundColor: "#727272",
          },
        },
        sizeSmall: {
          padding: "12px",
        },
        sizeLarge: {
          padding: "16px 20px",
        },
      },
    },
  },
  { clone: false },
);

export default theme;
