import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

const FONT_FAMILY_HEADING = '"Playfair Display", "serif"';
const FONT_FAMILY_TEXT = '"Arial", "sans-serif"';
const FONT_FAMILY_TEXT2 = '"Montserrat", "sans-serif"';

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 390, // mobile
      md: 1152, // tablet
      lg: 1440, // desktop
      xl: 1920, // desktop
    },
  },
  palette: {
    primary: {
      main: "#DB1111",
    },
    secondary: {
      main: "#000",
    },
    background: {
      default: "#FFF",
      secondary: "#DB1111",
      paper: "#F8F8F8",
      dark: "#D0D0D0",
    },
    text: {
      primary: "#000000",
      secondary: "#FFF",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        // Disable ripple effect globally
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT,
    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontWeight: "bold",
    },
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontWeight: "bold",
    },
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontWeight: "bold",
    },
    h4: {
      fontFamily: FONT_FAMILY_HEADING,
      fontWeight: "bold",
    },
    h5: {
      fontFamily: FONT_FAMILY_HEADING,
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT2,
    },
    body1: {
      fontFamily: FONT_FAMILY_TEXT2,
    },
    body2: {
      fontFamily: FONT_FAMILY_TEXT2,
      fontSize: "24px",
    },
    button: {
      fontFamily: FONT_FAMILY_TEXT2,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: "normal",
      letterSpacing: 0,
      textTransform: "none",
    },
    caption: {
      fontFamily: FONT_FAMILY_HEADING,
    },
    overline: {
      fontFamily: FONT_FAMILY_TEXT,
      textTransform: "none",
    },
    chart: {
      fontFamily: FONT_FAMILY_TEXT2,
    },
  },
  widths: {
    values: {
      md: 1106,
      lg: 1240,
      xl: 1520,
    },
  },
});

const { breakpoints, palette, typography } = theme;
const { pxToRem } = typography;

// Typography
deepmerge(
  typography,
  {
    h1: {
      fontSize: pxToRem(30),
      lineHeight: 40 / 30,
      color: palette.text.secondary,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(48),
        lineHeight: 52.8 / 48,
      },
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(72),
        lineHeight: 79.2 / 72,
      },
    },
    h2: {
      fontSize: pxToRem(30),
      lineHeight: 49.2 / 30,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(48),
        lineHeight: 71.75 / 48,
      },
    },
    h3: {
      fontSize: pxToRem(30),
      [breakpoints.up("md")]: {
        fontSize: pxToRem(40),
        lineHeight: 58.67 / 40,
      },
    },
    h4: {
      fontSize: pxToRem(24),
      [breakpoints.up("md")]: {
        fontSize: pxToRem(36),
        lineHeight: 53.82 / 36,
      },
    },
    h5: {
      fontSize: pxToRem(14),
      lineHeight: 30 / 14,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(16),
        lineHeight: 30 / 16,
      },
    },
    body1: {
      fontSize: pxToRem(18),
      lineHeight: 30 / 18,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(24),
        lineHeight: 35.88 / 24,
      },
    },
    body2: {
      fontSize: pxToRem(18),
      lineHeight: 26.91 / 18,
    },
    button: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(24),
        lineHeight: 35.88 / 24,
      },
    },
    caption: {
      fontSize: pxToRem(14),
      [breakpoints.up("md")]: { fontSize: pxToRem(14) },
    },
    subtitle1: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      [breakpoints.up("md")]: {
        fontSize: typography.pxToRem(24),
        lineHeight: 35.88 / 24,
      },
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 20 / 14,
      [breakpoints.up("md")]: {
        fontSize: typography.pxToRem(18),
        lineHeight: 30 / 18,
      },
    },
    overline: {
      fontSize: pxToRem(10.48),
      lineHeight: 11.98 / 10.48,
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(14),
        lineHeight: 16 / 14,
      },
    },
  },
  { clone: false },
);

// Overrides
deepmerge(
  theme.components,
  {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: `${typography.pxToRem(10)} ${typography.pxToRem(20)}`,
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: palette.secondary.main,
            backgroundColor: palette.background.default,
            boxShadow: "none",
            borderRadius: pxToRem(50),
            border: `1px solid ${palette.primary.main}`,
            "&:hover": {
              boxShadow: "none",
              color: palette.text.primary,
              backgroundColor: palette.background.dark,
              borderRadius: pxToRem(50),
              border: `1px solid ${palette.primary.main}`,
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            color: palette.secondary.main,
            backgroundColor: palette.background.default,
            boxShadow: "none",
            borderRadius: 0,
            border: "1px solid transparent",
            "&:hover": {
              boxShadow: "none",
              color: palette.secondary.main,
              backgroundColor: palette.background.default,
              borderRadius: pxToRem(5),
              border: `1px solid ${palette.background.default}`,
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            color: palette.text.secondary,
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: pxToRem(50),
            border: `1px solid ${palette.background.default}`,
            "&:hover": {
              color: palette.primary.main,
              backgroundColor: palette.background.default,
              borderRadius: pxToRem(50),
              border: `1px solid ${palette.background.default}`,
            },
          },
        },
      ],
    },
  },
  { clone: false },
);
export default theme;
