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
    // all display1 available on figma design
    display1SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 72,
      lineHeight: 72 / 72,
      fontWeight: 300,
    },
    display1Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 72,
      lineHeight: 72 / 80,
      fontWeight: 700,
    },
    display1ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 72,
      lineHeight: 72 / 80,
      fontWeight: 800,
    },

    // all display2 available on figma design
    display2SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 60,
      lineHeight: 60 / 72,
      fontWeight: 300,
    },
    display2Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 60,
      lineHeight: 60 / 72,
      fontWeight: 700,
    },
    display2ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 60,
      lineHeight: 60 / 72,
      fontWeight: 800,
    },

    // all h1 available on figma design
    h1SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 48,
      lineHeight: 48 / 56,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.04em",
    },
    h1Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 48,
      lineHeight: 48 / 56,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h1ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 48,
      lineHeight: 48 / 56,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.04em",
      textTransform: "uppercase",
    },

    h1SmallSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 34,
      lineHeight: 34 / 40,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.04em",
    },
    h1SmallBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 34,
      lineHeight: 34 / 40,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h1SmallExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 34,
      lineHeight: 34 / 40,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.04em",
      textTransform: "uppercase",
    },

    // all h2 typography available on figma design
    h2SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 39,
      lineHeight: 39 / 47,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h2Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 39,
      lineHeight: 39 / 47,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 39,
      lineHeight: 39 / 47,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.04em",
      textTransform: "uppercase",
    },

    h2SmallSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h2SmallBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2SmallExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
    },

    // all h4 typography available on figma design
    h3SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 300,
    },
    h3Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 700,
    },
    h3ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 33,
      lineHeight: 33 / 40,
      fontStyle: "normal",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
    },

    h3SmallSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h3SmallBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      letterSpacing: "-0.02em",
      fontWeight: 700,
    },
    h3SmallExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
    },

    // all h4 typography available on figma design
    h4SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 300,
    },
    h4Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
    },

    h4SmallSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 23 / 28,
      fontStyle: "normal",
      fontWeight: 300,
    },
    h4SmallBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 23 / 28,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4SmallExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 23 / 28,
      fontStyle: "normal",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },

    // all h5 typography available on figma design
    h5SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 28 / 28,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h5Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 23 / 28,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 23,
      lineHeight: 23 / 28,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
    },

    h5SmallSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 19,
      lineHeight: 19 / 23,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h5SmallBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 19,
      lineHeight: 19 / 23,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5SmallExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 19,
      lineHeight: 19 / 23,
      fontStyle: "normal",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },

    // all h6 typography available on figma design
    h6SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 19,
      lineHeight: 19 / 23,
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h6Bold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 19,
      lineHeight: 19 / 23,
      fontWeight: 700,
      fontStyle: "normal",
      letterSpacing: "-0.02em",
    },
    h6ExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 19,
      lineHeight: 19 / 23,
      fontWeight: 700,
      fontStyle: "normal",
      letterspacing: "-0.02em",
      textTransform: "uppercase",
    },

    h6SmallSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 16 / 19,
      fontWeight: 300,
      letterSpacing: "-0.02em",
    },
    h6SmallBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 16 / 19,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h6SmallExtraBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: 16 / 19,
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },

    // all h6 subheadings available on figma design
    subheadingRegular: {
      fontFamily: FONT_FAMILY_SECONDARY,
      fontSize: 20,
      lineHeight: 20 / 30,
      fontStyle: "normal",
      fontWeight: 300,
    },
    subheadingSemiBold: {
      fontFamily: FONT_FAMILY_SECONDARY,
      fontSize: 20,
      lineHeight: 20 / 28,
      fontStyle: "normal",
      fontWeight: 700,
    },
    subheadingUnderline: {
      fontFamily: FONT_FAMILY_SECONDARY,
      fontSize: 20,
      lineHeight: 20 / 28,
      fontStyle: "normal",
      fontWeight: 300,
      textDecorationLine: "underline",
    },

    // all  paragraph3 available on figma design
    subtitle1Regular: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 18,
      lineHeight: 18 / 28,
      fontStyle: "normal",
      fontWeight: 400,
    },
    subtitle1SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 18,
      lineHeight: 18 / 24,
      fontStyle: "normal",
      fontWeight: 600,
    },
    subtitle1Underline: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 18,
      lineHeight: 18 / 24,
      fontStyle: "normal",
      fontWeight: 300,
      textDecorationLine: "underline",
    },

    // all  paragraph2 available on figma design
    body2Regular: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 16,
      lineHeight: 16 / 26,
      fontStyle: "normal",
      fontWeight: 400,
    },
    body2SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 16,
      lineHeight: 16 / 19,
      fontStyle: "normal",
      fontWeight: 600,
    },
    body2Underline: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 16,
      lineHeight: 16 / 20,
      fontStyle: "normal",
      fontWeight: 400,
      textDecorationLine: "underline",
    },

    // all  paragraph1 available on figma design
    body1Regular: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 14,
      lineHeight: 14 / 23,
      fontStyle: "normal",
      fontWeight: 400,
    },
    body1SemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 14,
      lineHeight: 14 / 17,
      fontStyle: "normal",
      fontWeight: 600,
    },
    body1Underline: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 14,
      lineHeight: 14 / 17,
      fontStyle: "normal",
      fontWeight: 400,
      textDecorationLine: "underline",
    },

    // all caption available on figma design
    captionRegular: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 12,
      lineHeight: 12 / 14,
      fontStyle: "normal",
      fontWeight: 400,
    },
    captionSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 12,
      lineHeight: 12 / 14,
      fontStyle: "normal",
      fontWeight: 600,
    },
    captionCAP: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 12,
      lineHeight: 12 / 14,
      fontStyle: "normal",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },

    // all footer available on figma design
    footerRegular: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 12,
      lineHeight: 12 / 14,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: "0.02em",
    },
    footerSemiBold: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 10,
      lineHeight: 10 / 12,
      fontStyle: "normal",
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    footerCAP: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: 10,
      lineHeight: 10 / 12,
      fontStyle: "normal",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
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
            backgroundColor: palette.text.secondary.main, /// white
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
          props: { variant: "default" },
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
