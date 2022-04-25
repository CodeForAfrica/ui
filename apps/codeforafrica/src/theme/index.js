import { createTheme } from "@commons-ui/core";
import { deepmerge } from "@mui/utils";

const FONT_FAMILY_PRIMARY = '"Open Sans", sans-serif';
const FONT_FAMILY_SECONDARY = "Merriweather, serif";

const palette = {
  mode: "light",
  primary: { main: "#1020E1", light: "#EFF0FD", dark: "#08125C" }, // blues
  secondary: { main: "#000000", light: "#7F7272" },
  highlight: { main: "#ED1C24" },
  grey: { main: "#B4ABAB", light: "#E3DFDF" },
  text: { primary: "#000000", secondary: "#FFFFFF" },
  background: { main: "#F6F5F5" },
  action: { hoverOpacity: 0, focusOpacity: 0 },
};

const breakpoints = {
  values: {
    xs: 390,
    sm: 768,
    md: 1152,
    lg: 1440,
    xl: 1920,
  },
};

const theme = createTheme({
  palette,
  breakpoints,
  contentWidths: {
    values: {
      sm: 708,
      md: 904,
      lg: 1024,
      xl: 1440,
    },
    unit: "px",
  },
  typography: {
    fontFamily: FONT_FAMILY_PRIMARY,
    display1: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: 72 / 72,
    },
    display2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: 60 / 72,
    },
    h1: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
    },
    h4: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
    },
    h5: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    subheading: {
      fontFamily: FONT_FAMILY_SECONDARY,
      fontStyle: "normal",
      fontWeight: 300,
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
    },
    body1: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
    },
    caption: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: 14 / 23,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: palette.primary.main,
            color: palette.text.secondary.main,
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.primary.main,
              color: palette.text.secondary.main,
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: palette.primary.dark,
            color: palette.text.secondary.main,
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.primary.dark,
              color: palette.text.secondary.main,
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            backgroundColor: palette.text.secondary.main,
            color: palette.primary.main,
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.text.secondary.main,
              color: palette.primary.main,
            },
          },
        },
        {
          props: { variant: "default", color: "primary" },
          style: {
            backgroundColor: palette.grey.light,
            color: palette.grey.main,
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.grey.light,
              color: palette.grey.main,
            },
          },
        },
      ],
    },
  },
});

// deepmerge font-size so that we don't overide other settings such as
// font-family set above
const { pxToRem } = theme.typography;
deepmerge(
  theme.typography,
  {
    display1: {
      fontSize: pxToRem(72),
    },
    display2: {
      fontSize: pxToRem(60),
    },
    h1: {
      fontSize: pxToRem(28),
      lineHeight: 34 / 28,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(48),
        lineHeight: 56 / 48,
      },
    },

    h2: {
      fontSize: pxToRem(23),
      lineHeight: 28 / 23,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(39),
        lineHeight: 47 / 39,
      },
    },

    h3: {
      fontSize: pxToRem(28),
      lineHeight: 34 / 28,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(33),
        lineHeight: 40 / 33,
      },
    },

    h4: {
      fontSize: pxToRem(23),
      lineHeight: 28 / 23,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(28),
        lineHeight: 34 / 28,
      },
    },

    h5: {
      fontSize: pxToRem(19),
      lineHeight: 23 / 19,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(23),
        lineHeight: 28 / 23,
      },
    },

    h6: {
      fontSize: pxToRem(16),
      lineHeight: 19 / 16,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(19),
        lineHeight: 23 / 19,
      },
    },

    subheading: {
      fontSize: pxToRem(18),
      lineHeight: 28 / 18,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(20),
        lineHeight: 30 / 20,
      },
    },

    subtitle1: {
      fontSize: pxToRem(16),
      lineHeight: 26 / 16,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(18),
        lineHeight: 28 / 18,
      },
    },

    subtitle2: {
      fontSize: pxToRem(14),
      lineHeight: 23 / 14,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(16),
        lineHeight: 26 / 16,
      },
    },

    body1: {
      fontSize: pxToRem(12),
      lineHeight: 14 / 12,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(14),
        lineHeight: 23 / 14,
      },
    },
    caption: {
      fontSize: pxToRem(14),
    },
  },
  { clone: false }
);

export default theme;
