import { createTheme } from "@commons-ui/core";
import { deepmerge } from "@mui/utils";

const FONT_FAMILY_PRIMARY = '"Open Sans", sans-serif';
const FONT_FAMILY_SECONDARY = "Merriweather, serif";

const palette = {
  mode: "light",
  primary: { main: "#1020E1", light: "#EFF0FD", dark: "#08125C" }, // blues
  secondary: { main: "#000000", light: "#7F7272" },
  error: { main: "#EF4444" },
  grey: { main: "#B4ABAB", light: "#E3DFDF" },
  text: { primary: "#000000", secondary: "#FFFFFF" },
  divider: "#DAD5D5",
  background: { main: "#F6F5F5" },
  action: { hoverOpacity: 0, focusOpacity: 0 },
  highlight: { main: "#ED1C24" },
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
      fontWeight: 300,
      lineHeight: 72 / 72,
    },
    display2: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: 72 / 60,
      letterSpacing: "-0.04em",
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
      letterSpacing: "-0.04em",
    },
    h3: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: "-0.02em",
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
      fontWeight: 400,
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
      lineHeight: 14 / 12,
    },
    footer: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: 14 / 12,
      letterSpacing: "0.02rem",
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
        sizeSmall: {
          padding: "8px 16px",
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
          padding: 0,
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
        label: {
          paddingLeft: 8,
          paddingRight: 8,
        },
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
      fontSize: pxToRem(33),
      lineHeight: 40 / 33,
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
    h3Light: {
      ...theme.typography.h3,
      fontSize: pxToRem(28),
      fontWeight: 300,
      lineHeight: 34 / 28,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(28),
        lineHeight: 34 / 28,
      },
    },
    h4: {
      fontSize: pxToRem(23),
      lineHeight: 28 / 23,
      [theme.breakpoints.up("md")]: {
        fontSize: pxToRem(33),
        lineHeight: 40 / 33,
      },
    },
    h5: {
      fontSize: pxToRem(23),
      lineHeight: 28 / 23,
    },
    h5ExtraBold: {
      ...theme.typography.h5,
      fontSize: pxToRem(23),
      fontWeight: 700,
      lineHeight: 28 / 23,
      textTransform: "uppercase",
    },
    h5Small: {
      ...theme.typography.h5,
      fontSize: pxToRem(19),
      lineHeight: 23 / 19,
    },
    h5SemiBold: {
      ...theme.typography.h5,
      fontSize: pxToRem(23),
      fontWeight: 300,
      lineHeight: 28 / 23,
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
    subheadingSemiBold: {
      ...theme.typography.subheading,
      fontSize: pxToRem(20),
      fontWeight: 600,
      lineHeight: 28 / 20,
    },
    subheadingUnderline: {
      ...theme.typography.subheading,
      fontSize: pxToRem(20),
      lineHeight: 28 / 20,
      textDecoration: "underline",
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
      fontSize: pxToRem(14),
      lineHeight: 23 / 14,
    },
    body1SemiBold: {
      ...theme.typography.body1,
      fontSize: pxToRem(14),
      fontWeight: 600,
      lineHeight: 17 / 14,
    },
    body1Underline: {
      ...theme.typography.body1,
      fontSize: pxToRem(14),
      lineHeight: 17 / 14,
    },
    body2: {
      fontSize: pxToRem(16),
      lineHeight: 26 / 16,
    },
    body2SemiBold: {
      ...theme.typography.body2,
      fontSize: pxToRem(16),
      fontWeight: 600,
      lineHeight: 19 / 16,
    },
    body2Underline: {
      ...theme.typography.body2,
      fontSize: pxToRem(16),
      lineHeight: 19 / 16,
      textDecoration: "underline",
    },
    body3: {
      fontSize: pxToRem(18),
      lineHeight: 28 / 18,
    },
    body3SemiBold: {
      ...theme.typography.body3,
      fontSize: pxToRem(18),
      fontWeight: 600,
      lineHeight: 24 / 18,
    },
    body3Underline: {
      ...theme.typography.body3,
      fontSize: pxToRem(18),
      lineHeight: 24 / 18,
      textDecoration: "underline",
    },
    button: {
      fontSize: pxToRem(16),
      lineHeight: 19 / 16,
      // 10% of 16px = 1.6px
      letterSpacing: pxToRem(0.16),
    },
    caption: {
      fontSize: pxToRem(12),
    },
    captionCap: {
      ...theme.typography.caption,
      fontSize: pxToRem(12),
      fontWeight: 600,
      textTransform: "uppercase",
    },
    footer: {
      fontSize: pxToRem(12),
    },
    footerSemiBold: {
      ...theme.typography.footer,
      fontWeight: 600,
      fontSize: pxToRem(10),
      lineHeight: 12 / 10,
    },
    footerCap: {
      ...theme.typography.footer,
      fontWeight: 700,
      fontSize: pxToRem(10),
      lineHeight: 14 / 10,
      letterSpacing: "0.08rem",
      textTransform: "uppercase",
    },
  },
  { clone: false }
);

deepmerge(
  theme.components,
  {
    MuiCssBaseline: {
      styleOverrides: `
      blockquote {
        background-color: ${palette.background.main};
        font-size: ${pxToRem(16)};
        line-height: ${26 / 16};
        margin: 20px 0;
        padding: 20px;
      }
      h4 {
        font-size: ${pxToRem(23)};
        line-height: ${28 / 23};
        margin: 40px 0;
      },
      figure {
        margin: 20px 0;
      }
      figcaption {
        color: ${palette.primary.main};
        margin-top: 20px;
        text-align: center;
        font-size: ${pxToRem(12)};
      },
      img {
        height: auto;
        object-fit: contain;
        width: 100%;
      }
      hr {
        border-bottom-width: thin;
        border-color: ${palette.divider};
        border-style: solid;
        border-top: 0;
        margin: 30px 0;
      }
      p, li {
        font-size: ${pxToRem(16)};
        line-height: ${26 / 16};
      }
      p {
        margin: 30px 0;
      }
      @media (min-width: 1152px) {
        blockquote {
          padding: 50px 55.5px;
          margin: 40px 0;
        }
        figure {
          margin: 40px 0;
        }
        p, li {
          font-size: ${pxToRem(18)};
          line-height: ${28 / 18};
        }
      }
    `,
    },
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          ...theme.typography.button,
        },
        sizeLarge: {
          ...theme.typography.button,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
        sizeSmall: {
          ...theme.typography.body1,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          ...theme.typography.body2,
          padding: "12.5px 12px 5.5px 12px",
          "&::placeholder": {
            color: "#D0CBCB",
            opacity: 1.0,
            WebkitTextFillColor: "#D0CBCB",
          },
        },
        inputSizeSmall: {
          padding: "9.5px 12px 3.5px 12px",
          ...theme.typography.body1,
        },
        sizeSmall: {
          paddingRight: 10,
        },
      },
    },
  },
  { clone: false }
);

export default theme;
