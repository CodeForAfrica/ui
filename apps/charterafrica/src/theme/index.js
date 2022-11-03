import { createTheme } from "@commons-ui/core";
import { deepmerge } from "@mui/utils";

const OPEN_SANS_FONT_FAMILY = '"Open Sans", sans-serif';
const PROMPT_FONT_FAMILY = "Prompt, sans-serif";

const palette = {
  mode: "light",
  primary: { light: "#E2C4EC", main: "#B560D0", dark: "#481D57" },
  secondary: { light: "#FBE7A3", main: "#F7CE46", dark: "#31290E" },
  neutral: { light: "#CDBDC4", main: "#967684", dark: "#3E202C" },
  error: { main: "#F29D88" },
  warning: { main: "#F7CE46" },
  success: { main: "#AAD4A9" },
  text: { primary: "#000000", secondary: "#FFFFFF" },
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
  fontFamily = OPEN_SANS_FONT_FAMILY,
  others = undefined
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
      lg: 1144,
      xl: 1144,
    },
    unit: "px",
  },
  typography: {
    fontFamily: OPEN_SANS_FONT_FAMILY,
    display1: initializeTypographyVariant(72, 80, 900, PROMPT_FONT_FAMILY),
    display2: initializeTypographyVariant(60, 72, 900, PROMPT_FONT_FAMILY),
    h1: initializeTypographyVariant(48, 56, 700, PROMPT_FONT_FAMILY),
    h1Small: initializeTypographyVariant(34, 40, 700, PROMPT_FONT_FAMILY),
    h2: initializeTypographyVariant(39, 47, 700, PROMPT_FONT_FAMILY),
    h2Small: initializeTypographyVariant(33, 40, 700, PROMPT_FONT_FAMILY),
    h3: initializeTypographyVariant(33, 40, 700, PROMPT_FONT_FAMILY),
    h3Small: initializeTypographyVariant(28, 34, 700, PROMPT_FONT_FAMILY),
    h4: initializeTypographyVariant(28, 34, 700, PROMPT_FONT_FAMILY),
    h4Small: initializeTypographyVariant(23, 28, 700, PROMPT_FONT_FAMILY),
    h5: initializeTypographyVariant(23, 28, 700, PROMPT_FONT_FAMILY),
    h5Small: initializeTypographyVariant(19, 23, 700, PROMPT_FONT_FAMILY),
    h6: initializeTypographyVariant(19, 23, 700, PROMPT_FONT_FAMILY),
    h6Small: initializeTypographyVariant(16, 19, 700, PROMPT_FONT_FAMILY),
    subheading: initializeTypographyVariant(20, 24),
    subtitle1: undefined,
    subtitle2: undefined,
    p1: initializeTypographyVariant(14, 17),
    p2: initializeTypographyVariant(16, 19),
    p2SemiBold: initializeTypographyVariant(16, 19, 600),
    p3: initializeTypographyVariant(18, 21.6),
    body1: undefined,
    body2: undefined,
    caption: initializeTypographyVariant(12, 14),
    footer: initializeTypographyVariant(10, 12),
    overline: undefined,
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
      ...theme.typography.p2SemiBold,
      textTransform: "title",
    },
  },
  { clone: false }
);

deepmerge(
  theme.components,
  {
    MuiButtonBase: {
      styleOverrides: {
        ...theme.typography.p2SemiBold,
      },
    },
  },
  { clone: false }
);

export default theme;
