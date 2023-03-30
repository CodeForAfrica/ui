import { createTheme } from "@commons-ui/core";
import { buttonClasses } from "@mui/material";
import { deepmerge } from "@mui/utils";

import { neutral, primary, secondary } from "@/charterafrica/colors";

const OPEN_SANS_FONT_FAMILY = '"Open Sans", sans-serif';
const PROMPT_FONT_FAMILY = "Prompt, sans-serif";

const palette = {
  mode: "light",
  primary: { light: primary[200], main: primary[500], dark: primary[900] },
  secondary: {
    light: secondary[200],
    main: secondary[500],
    dark: secondary[900],
  },
  neutral: { light: neutral[200], main: neutral[500], dark: neutral[900] },
  error: { main: "#F29D88" },
  warning: { main: "#F7CE46" },
  success: { main: "#AAD4A9" },
  text: { primary: "#000000", secondary: "#FFFFFF" },
  background: {
    default: neutral[900],
  },
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
      lg: 1240,
      xl: 1240,
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
    h2SemiBold: initializeTypographyVariant(39, 47, 600, PROMPT_FONT_FAMILY),
    h2Small: initializeTypographyVariant(33, 40, 700, PROMPT_FONT_FAMILY),
    h3: initializeTypographyVariant(33, 40, 700, PROMPT_FONT_FAMILY),
    h3SemiBold: initializeTypographyVariant(33, 40, 600, PROMPT_FONT_FAMILY),
    h3Small: initializeTypographyVariant(28, 34, 700, PROMPT_FONT_FAMILY),
    h3SmallSemiBold: initializeTypographyVariant(
      28,
      34,
      600,
      PROMPT_FONT_FAMILY
    ),
    h4: initializeTypographyVariant(28, 34, 700, PROMPT_FONT_FAMILY),
    h4Small: initializeTypographyVariant(23, 28, 700, PROMPT_FONT_FAMILY),
    h5: initializeTypographyVariant(23, 28, 700, PROMPT_FONT_FAMILY),
    h5SemiBold: initializeTypographyVariant(23, 28, 600, PROMPT_FONT_FAMILY),
    h5Small: initializeTypographyVariant(19, 23, 700, PROMPT_FONT_FAMILY),
    h5SmallSemiBold: initializeTypographyVariant(
      19,
      23,
      600,
      PROMPT_FONT_FAMILY
    ),
    h6: initializeTypographyVariant(19, 23, 700, PROMPT_FONT_FAMILY),
    h6Small: initializeTypographyVariant(16, 19, 700, PROMPT_FONT_FAMILY),
    h6SmallSemiBold: initializeTypographyVariant(
      16,
      19,
      600,
      PROMPT_FONT_FAMILY
    ),
    subheading: initializeTypographyVariant(20, 24),
    subtitle1: undefined,
    subtitle2: undefined,
    p1: initializeTypographyVariant(14, 17),
    p1SemiBold: initializeTypographyVariant(14, 17, 600),
    p2: initializeTypographyVariant(16, 19),
    p2SemiBold: initializeTypographyVariant(16, 19, 600),
    p3: initializeTypographyVariant(18, 21.6),
    p3SemiBold: initializeTypographyVariant(18, 21.6, 600),
    body1: undefined,
    body2: undefined,
    caption: initializeTypographyVariant(12, 14),
    captionCap: initializeTypographyVariant(12, 14, 600, undefined, {
      textTransform: "uppercase",
    }),
    footer: initializeTypographyVariant(10, 12),
    footerCap: initializeTypographyVariant(10, 12, 600, undefined, {
      textTransform: "uppercase",
    }),
    overline: undefined,
    number: initializeTypographyVariant(72, 90, 900, PROMPT_FONT_FAMILY),
    numberSmall: initializeTypographyVariant(42, 42, 700, PROMPT_FONT_FAMILY),
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
        variantMapping: {
          h1: "h1",
          h1Small: "h1",
          h2: "h2",
          h2SemiBold: "h2",
          h2Small: "h2",
          h3: "h3",
          h3SemiBold: "h3",
          h3Small: "h3",
          h3SmallSemiBold: "h3",
          h4: "h4",
          h4Small: "h4",
          h5: "h5",
          h5SemiBold: "h5",
          h5Small: "h5",
          h5SmallSemiBold: "h5",
          h6: "h6",
          h6Small: "h6",
          subheading: "h6",
          p1: "p",
          p1SemiBold: "p",
          p2: "p",
          p2SemiBold: "p",
          p3: "p",
          p3SemiBold: "p",
          caption: "span",
          captionCap: "span",
          footer: "span",
          footerCap: "span",
          number: "span",
          numberSmall: "span",
        },
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
    MuiButton: {
      styleOverrides: {
        root: {
          ...theme.typography.p2SemiBold,
          boxShadow: "none",
          padding: "12px 18px",
          "&:hover": {
            boxShadow: "none",
          },
          [`&.${buttonClasses.disabled}`]: {
            backgroundColor: neutral[100],
            color: neutral[500],
          },
        },
        containedPrimary: {
          backgroundColor: neutral[900],
          color: palette.text.secondary,
          "&:focus": {
            backgroundColor: neutral[700],
          },
          "&:hover": {
            backgroundColor: neutral[500],
          },
        },
        containedSecondary: {
          backgroundColor: secondary[500],
          color: neutral[900],
          "&:hover": {
            backgroundColor: secondary[300],
          },
        },
        sizeSmall: {
          ...theme.typography.p1SemiBold,
          padding: "8px 16px",
        },
        sizeLarge: {
          ...theme.typography.p3SemiBold,
          padding: "14px 20px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Assume size="medium".
        root: {
          ...theme.typography.p2,
          border: "1px solid",
          borderRadius: 4,
          borderColor: neutral[400],
          borderSizing: "border-box",
          padding: "11.5px 12px", // 12.5 - 1px border
          // https://mui.com/material-ui/customization/how-to-customize/#state-classes
          "&:active": {
            borderColor: secondary[600],
          },
          "&:focus": {
            borderColor: primary[600],
          },
          "&.Mui-disabled": {
            backgroundColor: neutral[50],
            borderColor: neutral[200],
            color: neutral[400],
          },
          "&.Mui-error": {
            borderColor: "#EF4444",
          },
        },
        sizeSmall: {
          ...theme.typography.p1,
          padding: "8.5px 12px", // 9.5 - 1px border
        },
        notchedOutline: {
          display: "none",
        },
        input: {
          height: "auto",
          padding: 0,
          "&::placeholder": {
            color: neutral[400],
          },
        },
      },
      // Custom variant to handle size="large".
      variants: [
        {
          props: { size: "large" },
          style: {
            ...theme.typography.p3,
            padding: "14px 12px", // 15 - 1px border
          },
        },
      ],
    },
    MuiCssBaseline: {
      styleOverrides: `
       #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
       }
      `,
    },
  },
  { clone: false }
);

export default theme;
