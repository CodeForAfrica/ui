import createTheme from "@hurumap-ui/charts/styles/createTheme";
import { deepmerge } from "@material-ui/utils";

const FONT_FAMILY_HEADING = '"Amiri", "serif"';
const FONT_FAMILY_TEXT_PRIMARY = '"Merriweather", "serif"';
const FONT_FAMILY_TEXT_SECONDARY = '"Open Sans", "sans-serif"';
const FONT_FAMILY_TEXT_HIGHTLIGHT = '"Source Sans Pro", "sans-serif"';

// ## DEFAULT
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1360,
      xl: 1920,
    },
  },
  palette: {
    background: { default: "#fff" },
    primary: { main: "#202020", dark: "#000000" },
    secondary: { main: "#EBEBEB", light: "#F7F7F7" }, // grey
    highlight: { main: "#005DFD", light: "#FFB322", faded: "#90DAFF" }, // blue, yellow, light blue
    text: { primary: "#202020", secondary: "#ffffff" },
    chart: {
      complete: "#005DFD",
      inprogress: "#90DAFF",
      inconclusive: "#909090",
      unstarted: "#EBEBEB",
      behindSchedule: "#FFB322",
      stalled: "#FF5255",
    },
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT_SECONDARY,
    // PT H1
    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: "bold",
      letterSpacing: "0.76px",
    },
    // PT H2
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: "normal",
      letterSpacing: "0.86px",
    },
    // PT H3
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: "bold",
    },
    // PT H4
    h4: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 600,
      letterSpacing: "0.64px",
      textTransform: "uppercase",
    },
    // PT H5
    h5: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 600,
      letterSpacing: "0.56px",
      textTransform: "Uppercase",
    },
    // PT H6
    h6: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "Uppercase",
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 600,
      letterSpacing: 0, // Status in chart section/component
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "regular",
      fontWeight: "bold",
      letterSpacing: 0, // Status text=> Handles H7/H8 text for status button content
    },
    // PT Body Normal
    body1: {
      fontFamily: FONT_FAMILY_TEXT_PRIMARY,
      fontStretch: "normal",
      fontWeight: "normal",
      letterSpacing: 0,
    },
    // PT Body Small
    body2: {
      fontFamily: FONT_FAMILY_TEXT_PRIMARY,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 400,
      letterSpacing: 0,
    },
    caption: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: 0, // Chart percentage text
    },
    button: {
      fontFamily: FONT_FAMILY_TEXT_HIGHTLIGHT,
      fontStretch: "normal",
      fontStyle: "normal",
      color: "white",
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          maxWidth: "100%",
          overflowX: "hidden",
          height: "100%",
        },
        body: {
          maxWidth: "100%",
          overflowX: "hidden",
          height: "100%",
        },
        // Next.js root div
        "#__next": {
          height: "100%",
        },
      },
    },
  },
  widths: {
    values: {
      lg: 1080, // 0, 141, 0, 141 margin
    },
  },
});

// ## RESPONSIVE FONTS
const { breakpoints, typography, palette } = theme;
const { pxToRem } = typography;
deepmerge(
  typography,
  {
    h1: {
      color: palette.primary.dark,
      fontSize: pxToRem(32),
      lineHeight: 40 / 32,
      fontWeight: 700,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(36),
        lineHeight: 56 / 36,
        padding: `${pxToRem(12)} 0`,
      },
    },
    h2: {
      fontSize: pxToRem(32),
      lineHeight: 48 / 32,
      padding: `${pxToRem(12)} 0`,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(36),
        lineHeight: 40 / 36,
      },
    },
    h3: {
      color: palette.primary.dark,
      fontSize: pxToRem(24),
      lineHeight: 32 / 24,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(24),
        lineHeight: 32 / 24,
      },
    },
    h4: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(16),
        lineHeight: 24 / 16,
      },
    },
    h5: {
      fontSize: pxToRem(14),
      lineHeight: 16 / 14,
      [breakpoints.up("lg")]: {
        color: palette.primary.main,
        fontSize: pxToRem(14),
        lineHeight: 16 / 14,
      },
    },
    h6: {
      fontSize: pxToRem(10),
      lineHeight: 16 / 10,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(10),
        lineHeight: 24 / 10,
      },
    },
    body1: {
      fontSize: pxToRem(18),
      lineHeight: 40 / 18,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(18),
        lineHeight: 40 / 18,
      },
    },
    body2: {
      fontSize: pxToRem(13),
      lineHeight: 24 / 13,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(13),
        lineHeight: 24 / 13,
      },
    },
    subtitle1: {
      fontSize: pxToRem(14),
      lineHeight: 24 / 14,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(12),
        lineHeight: 14.4 / 12,
      },
    },
    subtitle2: {
      fontSize: pxToRem(7),
      lineHeight: 19 / 7,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(10),
        lineHeight: 24 / 10,
      },
    },
    caption: {
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(12),
        lineHeight: 12 / 10,
      },
    },
    button: {
      fontSize: pxToRem(14),
      lineHeight: 18 / 14,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(14),
        lineHeight: 18 / 14,
      },
    },
  },
  { clone: false }
);

// ## OVERRIDES
deepmerge(
  theme.overrides,
  {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      contained: {
        backgroundColor: palette.primary.dark,
        border: "none",
        boxShadow: "none",
        color: palette.text.secondary,
        borderRadius: 0,
        "&:hover": {
          border: "none",
          boxShadow: "none",
        },
      },
      containedPrimary: {
        color: palette.text.secondary,
        backgroundColor: palette.highlight.main,
        border: "none",
        boxShadow: "none",
      },
      containedSecondary: {
        color: "#005DFD",
        backgroundColor: palette.secondary.main,
        border: "none",
        boxShadow: "none",
      },
      containedSizeSmall: {
        fontSize: typography.pxToRem(14),
        lineHeight: 18 / 14,
      },
      containedSizeLarge: {
        fontSize: typography.pxToRem(16),
        lineHeight: 24 / 16,
      },
      outlined: {
        backgroundColor: "none",
        border: `.122rem solid ${palette.primary.main}`,
        boxShadow: "none",
        boxSizing: "border-box",
        color: palette.primary.main,
        borderRadius: 0,
        "&:hover": {
          border: `.122rem solid ${palette.primary.main}`,
          boxShadow: "none",
        },
      },
      text: {
        backgroundColor: "none",
        boxShadow: "none",
        boxSizing: "border-box",
        color: palette.primary.main,
        borderRadius: 0,
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },
  { clone: false }
);

export default theme;
