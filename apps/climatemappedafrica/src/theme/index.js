import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

import chevronright from "@/climatemappedafrica/assets/icons/chevronright.svg";
import chevronrightDark from "@/climatemappedafrica/assets/icons/chevronrightDark.svg";
import hoverIcon from "@/climatemappedafrica/assets/icons/hover-icon.png";

const FONT_FAMILY = '"Poppins", "sans-serif"';

const buildVariant = (
  fontWeight,
  letterSpacing = 0,
  textTransform = "none",
) => ({
  fontFamily: FONT_FAMILY,
  fontWeight,
  letterSpacing,
  textTransform,
});

export const CHART_PRIMARY_COLOR_SCHEME = [
  "#0B2AEA",
  "#7986D1",
  "#DFDFDF",
  "#666666",
];
export const CHART_SECONDARY_COLOR_SCHEME = [
  "#FC0D1B",
  "#F8A199",
  "#DFDFDF",
  "#666666",
];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 390, // mobile
      md: 768, // tablet
      lg: 1280, // desktop
    },
  },
  palette: {
    primary: {
      main: "#0B2AEA", // main blue
      light: "#7986D1", // hightlight blue
    },
    secondary: {
      main: "#FC0D1B", // main red
      light: "#F8A199", // highlight red
    },
    background: {
      default: "#FFF", // some white
      paper: "#F8F8F8", // light white
    },
    grey: {
      dark: "#2A2A2C", // dark
      main: "#DFDFDF", // grey
      light: "#F0F0F0", // lightgrey
    },
    blue: {
      main: "#0B2AEA", // main blue
      light: "#7986D1", // hightlight blue
    },
    text: {
      primary: "#333333",
      secondary: "#FFFFFF",
      hint: "#1C2031",
    },
    chart: {
      text: { primary: "#707070" },
      primary: CHART_PRIMARY_COLOR_SCHEME,
      secondary: CHART_SECONDARY_COLOR_SCHEME,
    },
    // To avoid issues with components that have default color
    // see https://stackoverflow.com/a/72571943
    default: {
      main: "#0B2AEA",
    },
    divider: "#F0F0F0",
  },
  props: {
    MuiButtonBase: {
      // Disable ripple effect globally
      disableRipple: true,
      disableTouchRipple: true,
    },
  },
  // Font weights:
  // see: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
  // 300 	Light
  // 400 	Normal
  // 500 	Medium
  // 600 	Semi Bold
  // 700 	Bold
  // 900 	Black
  typography: {
    fontFamily: FONT_FAMILY,
    // e.g. Homepage, Hero
    h1: buildVariant(900),
    // e.g. Stories page, Featured Insight
    h2: buildVariant(300),
    // e.g. How it works, Our metrics
    h3: buildVariant(600),
    // e.g. Homepage, our Partners
    h4: buildVariant(900, 0.4, "uppercase"),
    // e.g. Homepage, Insights, Isiolo v Samburu Voter registration discrepancy
    h5: buildVariant(500),
    h6: {
      fontFamily: FONT_FAMILY,
    },
    subtitle1: {
      fontFamily: FONT_FAMILY,
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: FONT_FAMILY,
    },
    body1: {
      fontFamily: FONT_FAMILY,
    },
    body2: buildVariant(500),
    button: buildVariant(600),
    caption: {
      fontFamily: FONT_FAMILY,
    },
    overline: {
      fontFamily: FONT_FAMILY,
      fontWeight: 700,
      textTransform: "uppercase",
    },
  },
  contentWidths: {
    values: {
      md: 608, // 0, 80, 0, 80 margin
      lg: 1160, // 0, 140, 0, 140 margin
    },
  },
});

const { breakpoints, components, palette, typography } = theme;
const { pxToRem } = typography;
// Typography
deepmerge(
  typography,
  {
    // H0
    h1: {
      color: palette.grey.dark,
      fontSize: pxToRem(30),
      lineHeight: 40 / 30,
      padding: `${pxToRem(1.5)} 0`, // 43 - 40
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(48),
        lineHeight: 58 / 48,
        padding: `${pxToRem(4.5)} 0`, // 67 - 58
      },
    },
    // H1
    h2: {
      color: palette.text.hint,
      fontSize: pxToRem(50),
      lineHeight: 66 / 50,
      margin: `${pxToRem(2.5)} 0`, // 71 - 66
    },
    // H2
    h3: {
      color: "#212529",
      fontSize: pxToRem(30),
      lineHeight: 48 / 30,
      margin: `${pxToRem(-2.5)} 0`, // 91 - 96
    },
    // H3
    h4: {
      color: palette.grey.dark,
      fontSize: pxToRem(20),
      lineHeight: 30 / 20,
      margin: `${pxToRem(-1)} 0`, // 28 - 30
    },
    // H4
    h5: {
      color: "#212529",
      fontSize: pxToRem(20),
      lineHeight: 30 / 20,
      margin: `${pxToRem(-1)} 0`, // 28 - 30
    },
    h6: {
      fontSize: pxToRem(18),
      lineHeight: 27 / 18,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(18),
        lineHeight: 27 / 18,
      },
    },
    subtitle1: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(16),
        lineHeight: 24 / 16, // font 16 subtitle1
      },
    },
    subtitle2: {
      fontSize: pxToRem(14),
      lineHeight: 18 / 14,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(14),
        lineHeight: 18 / 14, // font 14 subtitle2
      },
    },
    body1: {
      fontSize: pxToRem(16),
      lineHeight: 25 / 16,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(16),
        lineHeight: 25 / 16, // font 18 body1
      },
    },
    // P2,
    body2: {
      fontSize: pxToRem(14),
      lineHeight: 24 / 14, // font body2 P2
    },
    button: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      margin: `${pxToRem(-0.5)} 0`, // 23 - 24
    },
    caption: {
      color: "#212529",
      fontSize: pxToRem(12),
      lineHeight: 18 / 12,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(12),
        lineHeight: 18 / 12, // font 12 caption
      },
    },
    overline: {
      color: palette.text.hint,
      fontSize: pxToRem(14),
      lineHeight: 21 / 14,
      margin: `${pxToRem(-0.5)} 0`, // 21 - 20
    },
  },
  { clone: false },
);

// Overrides
deepmerge(
  components,
  {
    MuiCssBaseline: {
      "@global": {
        ".leaflet-interactive": {
          cursor: `url(${hoverIcon.src}), pointer !important`,
        },
      },
      styleOverrides: `
        blockquote {
          border-left: 2px solid #333333;
          /* MuiTypography-root has margin-left: 0 that we must override */
          margin-left: -8px !important;
          padding-left: 6px;
        }
      `,
    },
    MuiButton: {
      root: {
        textDecoration: "none !important",
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "none !important",
        },
      },
      contained: {},
      containedPrimary: {
        color: palette.background.default,
        backgroundColor: palette.primary.main,
        boxShadow: "none",
        borderRadius: pxToRem(50),
        letterspacing: "1.6px",
        textAlign: "center",
        border: "3px solid white",
        textTransform: "uppercase",
        transition: "none !important",
        "&:hover, &:focus, &:focus-within": {
          color: palette.primary.main,
          boxShadow: "none",
          backgroundColor: palette.background.default,
          border: "3px solid transparent",
          borderRadius: pxToRem(50),
        },
        [breakpoints.up("lg")]: {
          color: palette.primary.main,
          backgroundColor: palette.background.default,
          boxShadow: "none",
          borderRadius: pxToRem(50),
          letterspacing: "1.6px",
          textAlign: "center",
          border: `3px solid ${palette.primary.main}`,
          textTransform: "uppercase",
          transition: "none !important",
          "&:hover, &:focus, &:focus-within": {
            color: palette.background.default,
            boxShadow: "none",
            backgroundColor: palette.primary.main,
            border: "3px solid transparent",
            borderRadius: pxToRem(50),
          },
        },
        "&::after": {
          content: '""',
          backgroundImage: "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginLeft: 0,
          height: 0,
          width: 0,
        },
        "&:hover::after": {
          content: '""',
          backgroundImage: "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "margin 0.3s ease",
          marginLeft: 0,
          height: 0,
          width: 0,
        },
      },
      text: {
        color: palette.primary.main,
        padding: 0,
        textTransform: "none",
        "&:hover": {
          color: palette.grey.dark,
          backgroundColor: "transparent",
          border: 0,
          fontWeight: "bold",
        },
        "&::after": {
          content: '""',
          backgroundImage: `url("${chevronright}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginLeft: pxToRem(20),
          height: pxToRem(23), // Must equal button line-height
          width: pxToRem(30),
        },
        "&:hover::after": {
          content: '""',
          backgroundImage: `url("${chevronrightDark}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "margin 0.3s ease",
          marginLeft: pxToRem(10),
          height: pxToRem(23), // Must equal button line-height
          width: pxToRem(30),
        },
      },
    },
    MuiCardActionArea: {
      root: {
        "&:hover $focusHighlight": {
          opacity: 0,
        },
        "&$focusVisible $focusHighlight": {
          opacity: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        // Disable ripple effect globally
        borderRadius: 0,
        "&:hover, &:focus, &:focus-within": {
          backgroundColor: "transparent",
        },
      },
    },
  }, // overides settings goes here
  { clone: false },
);

export default theme;
