import { createTheme } from "@commons-ui/core";

const FONT_FAMILY_PRIMARY = "'Open Sans', sans-serif";
const FONT_FAMILY_SECONDARY = "'Merriweather', serif";

const palette = {
  mode: "light",
  primary: { main: "#1020E1", light: "#EFF0FD", dark: "#08125C" },
  secondary: { main: "#000000", light: "#7F7272" },
  text: {
    primary: { main: "#000000" },
    secondary: { main: "#FFFFFF" },
  },
  background: { main: "#F6F5F5" },
  highlight: { main: "#ED1C24" },
  grey: { main: "#B4ABAB", light: "#E3DFDF" },
};

const breakpoints = {
  values: {
    mobile: 390,
    tablet: 768,
    laptop: 1152,
    desktop: 1440,
    largeDesktop: 1920,
  },
};

const theme = createTheme({
  palette,
  breakpoints,
  typography: {
    FONT_FAMILY_PRIMARY,
    FONT_FAMILY_SECONDARY,
    display1: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 72,
      lineHeight: 72 / 72,
      fontWeight: 300,
    },
    display2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 60,
      lineHeight: 60 / 72,
      fontWeight: 300,
    },

    // all h1 available on figma design
    h1: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 48,
      lineHeight: 48 / 56,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.04em",
    },

    h1Small: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 34,
      lineHeight: 34 / 40,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.04em",
    },

    // all h2 typography available on figma design
    h2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 39,
      lineHeight: 39 / 47,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },

    h2Small: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },

    // all h4 typography available on figma design
    h3: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 300,
    },

    h3Small: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },

    // all h4 typography available on figma design
    h4: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 300,
    },

    h4Small: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 23 / 28,
      fontStyle: "normal",
      fontWeight: 300,
    },

    // all h5 typography available on figma design
    h5: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 28 / 28,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },

    h5Small: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 19,
      lineHeight: 19 / 23,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    // all h6 typography available on figma design
    h6: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 19,
      lineHeight: 19 / 23,
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h6Small: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 16 / 19,
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },

    subheading: {
      fontFamily: FONT_FAMILY_SECONDARY,
      fontSize: 20,
      lineHeight: 20 / 30,
      fontStyle: "normal",
      fontWeight: 300,
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 18,
      lineHeight: 18 / 28,
      fontStyle: "normal",
      fontWeight: 400,
    },
    body2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 16,
      lineHeight: 16 / 26,
      fontStyle: "normal",
      fontWeight: 400,
    },
    body: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 14,
      lineHeight: 14 / 23,
      fontStyle: "normal",
      fontWeight: 400,
    },
    caption: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 12,
      lineHeight: 12 / 14,
      fontStyle: "normal",
      fontWeight: 400,
    },
    footer: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 12,
      lineHeight: 12 / 14,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "0.02em",
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
            backgroundColor: palette.primary.main, // #1020E1 => light blue
            color: palette.text.secondary.main, // white
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.primary.main, // #1020E1
              color: palette.text.secondary.main, // white
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: palette.primary.dark, /// #08125C => dark blue
            color: palette.text.secondary.main, // white
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.primary.dark, /// #08125C
              color: palette.text.secondary.main, // white
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            backgroundColor: palette.text.secondary.main, /// white background
            color: palette.primary.main, // #1020E1
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.text.secondary.main, /// white
              color: palette.primary.main, // #1020E1
            },
          },
        },
        {
          props: { variant: "default", color: "primary" },
          style: {
            backgroundColor: palette.grey.light, /// #E3DFDF => light grey
            color: palette.grey.main, // #B4ABAB
            transition: "none !important",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: palette.grey.light, /// #E3DFDF
              color: palette.grey.main, // #B4ABAB
            },
          },
        },
      ],
    },
  },
});

export default theme;
