import { createTheme } from "@commons-ui/core";

const FONT_FAMILY_PRIMARY = '"Open Sans", sans-serif';

const palette = {
  mode: "light",
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

const theme = createTheme({
  palette,
  breakpoints,
  contentWidths: {
    values: {
      sm: 728,
      md: 1024,
      lg: 1144,
      xl: 1144,
    },
    unit: "px",
  },
  typography: {
    fontFamily: FONT_FAMILY_PRIMARY,
    h1: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    h2: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    h3: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    h4: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    h5: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    h6: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    body1: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    body2: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    button: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    caption: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
    overline: {
      fontFamily: FONT_FAMILY_PRIMARY,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
