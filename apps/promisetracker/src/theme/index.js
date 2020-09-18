import { deepmerge } from '@material-ui/utils';

import createTheme from '@hurumap-ui/charts/styles/createTheme';

const FONT_FAMILY_HEADING = '"Amiri", "serif"';
const FONT_FAMILY_TEXT_PRIMARY = '"Georgia", "serif"';
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
    primary: { main: "#202020", dark: "#000000" }, // black
    secondary: { main: "#EBEBEB", light: "#F7F7F7" }, // grey
    hightlight: { main: "#005DFD", light: "#FFB322", faded: "#90DAFF" }, // blue. yellow, light blue
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT_SECONDARY,
    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: "bold",
      letterSpacing: "0.76px", // Amri  bold title
    },
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: "normal",
      letterSpacing: "0.86px", /// Amri Regular title/Section Titles
    },
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: "bold", // Amri Bold Footer title text/ Chart status text
    },
    h4: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: "0.64px",
      textTransform: "uppercase", // Open sans Card titles
    },
    h5: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: "0.56px",
      textTransform: "Uppercase", // Open sans Navigation Menu titles
    },
    h6: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "Uppercase", // Open sans Card dates Typography//Last update dates
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 600,
      letterSpacing: 0, // Open sans status in chart section/component
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "regular",
      fontWeight: "bold",
      letterSpacing: 0, // Open sans Status text
    },
    body1: {
      fontFamily: FONT_FAMILY_TEXT_PRIMARY,
      fontStretch: "normal",
      fontWeight: "normal",
      letterSpacing: 0, // Georgia title text 20px// Call to action sections
    },
    body2: {
      fontFamily: FONT_FAMILY_TEXT_PRIMARY,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 400,
      letterSpacing: 0, // Georgia regular body text 14px
    },
    caption: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: 0, // Chart percentage text
    },
    button: {
      fontFamily: FONT_FAMILY_TEXT_HIGHTLIGHT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      color: 'white',
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          maxWidth: '100%',
          overflowX: 'hidden',
          height: '100%',
        },
        body: {
          maxWidth: '100%',
          overflowX: 'hidden',
          height: '100%',
        },
        // Next.js root div
        '#__next': {
          height: '100%',
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
      [breakpoints.up('md')]: {
        fontSize: pxToRem(38),
        lineHeight: 56 / 38, /// Amiri  bold title
      },
    },
    h2: {
      color: palette.primary.main,
      fontSize: pxToRem(32),
      lineHeight: 48 / 32,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(36),
        lineHeight: 56 / 36, // Amri Regular title/Section Titles
      },
    },
    h3: {
      color: palette.primary.dark,
      fontSize: pxToRem(16),
      lineHeight: 35 / 16,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(24),
        lineHeight: 28.8 / 24, // Amri Bold Footer title text/Chart status text
      },
    },
    h4: {
      color: palette.primary.main,
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(16),
        lineHeight: 24 / 16, // Open sans Card titles
      },
    },
    h5: {
      color: palette.background.default,
      fontSize: pxToRem(14),
      lineHeight: 16 / 14,
      [breakpoints.up("md")]: {
        color: palette.primary.main,
        fontSize: pxToRem(14),
        lineHeight: 16 / 14, // Open sans Navigation Menu titles
      },
    },
    h6: {
      fontSize: pxToRem(10),
      lineHeight: 16 / 10,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(10),
        lineHeight: 24 / 10, // Card dates Typography
      },
    },
    body1: {
      color: palette.primary.main,
      fontSize: pxToRem(13),
      lineHeight: 24 / 13,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(18),
        lineHeight: 40 / 18, // MerryWeather title text 18px// Call to action sections
      },
    },
    body2: {
      fontSize: pxToRem(13),
      lineHeight: 24 / 13, // Merryweather regular body text 13px
    },
    subtitle1: {
      fontSize: pxToRem(14),
      lineHeight: 24 / 14,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(12),
        lineHeight: 14.4 / 12, // Open sans status in chart section/component
      },
    },
    subtitle2: {
      fontSize: pxToRem(7),
      lineHeight: 19 / 7,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(10),
        lineHeight: 24 / 10, // Open sans Status text=> Handles H7/H8 text for status button content
      },
    },
    caption: {
      [breakpoints.up('md')]: {
        fontSize: pxToRem(12),
        lineHeight: 12 / 10, /// Chart percentage text
      },
    },
    button: {
      fontSize: pxToRem(14),
      lineHeight: 18 / 14,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(14),
        lineHeight: 18 / 14, // Source sans pro Button text
      },
    },
  },
  { clone: false },
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
        color: palette.background.default,
        borderRadius: 0,
        "&:hover": {
          border: "none",
          boxShadow: "none", // black button
        },
      },
      containedPrimary: {
        color: palette.background.default,
        backgroundColor: "#005DFD",
        border: "none",
        boxShadow: "none", // blue button
      },
      containedSecondary: {
        color: "#005DFD",
        backgroundColor: palette.secondary.main,
        border: "none",
        boxShadow: "none", // grey button
      },
      containedSizeSmall: {
        fontSize: typography.pxToRem(14),
        lineHeight: 18 / 14,
      },
      containedSizeLarge: {
        fontSize: typography.pxToRem(16),
        lineHeight: 24 / 16,
      },
    },
  },
  { clone: false },
);

export default theme;
