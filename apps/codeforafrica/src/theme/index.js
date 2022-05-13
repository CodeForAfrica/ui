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
    body2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 600,
    },
    body3: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
    },
    button: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 600,
    },
    caption: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: 14 / 23,
    },
    footer: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: 12 / 10,
      letterSpacing: "0.02rem",
    },
    footerCap: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: 14 / 10,
      letterSpacing: "0.08rem",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          border: `1px solid ${palette.primary.main}`,
          "&:hover": {
            backgroundColor: palette.text.secondary,
            color: palette.primary.main,
          },
        },
        sizeMedium: {
          padding: "12px 18px",
        },
        sizeLarge: {
          padding: 24,
        },
      },
      variants: [
        {
          props: { variant: "contained-reverse", color: "primary" },
          style: {
            backgroundColor: palette.text.secondary,
            border: `1px solid ${palette.primary.main}`,
            color: palette.primary.main,
            "&:hover": {
              backgroundColor: palette.primary.main,
              border: `1px solid ${palette.text.secondary}`,
              color: palette.text.secondary,
            },
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 3,
          padding: 8,
          "&.MuiChip-clickable": {
            "&:hover": {
              backgroundColor: palette.background.main,
              ...(ownerState.variant === "filled" &&
                ownerState.color === "primary" && {
                  backgroundColor: "#E0E2FC",
                }),
            },
          },
        }),
        filled: ({ ownerState }) => ({
          border: `1px solid ${palette.background.main}`,
          backgroundColor: palette.background.main,
          color: palette.secondary.light,
          ...(ownerState.color === "primary" && {
            border: `1px solid ${palette.primary.main}`,
            backgroundColor: "#E0E2FC",
            color: palette.primary.main,
          }),
        }),
      },
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
      [theme.breakpoints.up("sm")]: {
        fontSize: pxToRem(33),
        lineHeight: 40 / 33,
      },
    },
    h4: {
      fontSize: pxToRem(23),
      lineHeight: 28 / 23,
      [theme.breakpoints.up("sm")]: {
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
    body2: {
      fontSize: pxToRem(14),
      lineHeight: 17 / 14,
    },
    body3: {
      fontSize: pxToRem(18),
      lineHeight: 28 / 18,
    },
    body3SemiBold: {
      ...theme.typography.body3,
      fontWeight: 600,
      lineHeight: 24 / 18,
    },
    button: {
      fontSize: pxToRem(16),
      lineHeight: 19 / 16,
      // 10% of 16px = 1.6px
      letterSpacing: pxToRem(0.16),
    },
    caption: {
      fontSize: pxToRem(14),
    },
  },
  { clone: false }
);

export default theme;
