import { deepmerge } from '@material-ui/utils';

import createTheme from '@hurumap-ui/charts/styles/createTheme';

const FONT_FAMILY_HEADING = '"Amiri", "serif"';
const FONT_FAMILY_TEXT_SECONDARY = '"Open Sans", "sans-serif"';
const FONT_FAMILY_TEXT_HIGHTLIGHT = '"Source Sans Pro", "sans-serif"';

// ## DEFAULT
const theme = createTheme({
  palette: {
    background: { default: '#fff' },
    primary: { main: '#202020', dark: '#000000' },
    secondary: {
      main: '#EBEBEB',
      light: '#F7F7F7',
    },
    highlight: { main: '#005DFD', light: '#FFB322', faded: '#90DAFF' },
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT_SECONDARY,
    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 'bold',
      letterSpacing: '0.76px',
    },
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 'normal',
      letterSpacing: '0.86px',
    },
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: '0.64px',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: '0.56px',
      textTransform: 'Uppercase',
    },
    h6: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: 'Uppercase',
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'regular',
      fontWeight: 600,
      letterSpacing: 0,
    },
    body1: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'italic',
      fontWeight: 500,
      letterSpacing: 0, // 20px
    },
    body2: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 400,
      letterSpacing: 0, // 14px
    },
    caption: {
      fontFamily: FONT_FAMILY_TEXT_SECONDARY,
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0, // 12px/10px
    },
    button: {
      fontFamily: FONT_FAMILY_TEXT_HIGHTLIGHT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      color: 'white',
      fontWeight: 600,
      letterSpacing: 0,
      textTransform: 'none', // button ex
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
      md: 960, // 0, 24, 0, 24 margins
      lg: 1366, // 0, 40, 0, 40 margins
      xl: 1920, // 0, 140, 0, 140 margins DESIGNS
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
      lineHeight: 32 / 40,
      fontWeight: 700,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(38),
        lineHeight: 38 / 56,
      },
    },
    h2: {
      color: palette.primary.main,
      fontSize: pxToRem(32),
      lineHeight: 32 / 48,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(36),
        lineHeight: 36 / 56,
      },
    },
    h3: {
      color: palette.primary.dark,
      fontSize: pxToRem(16),
      lineHeight: 16 / 35,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(24),
        lineHeight: 24 / 28.8,
      },
    },
    h4: {
      color: palette.primary.main,
      fontSize: pxToRem(16),
      lineHeight: 16 / 24,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(16),
        lineHeight: 16 / 24,
      },
    },
    h5: {
      color: palette.background.main,
      fontSize: pxToRem(14),
      lineHeight: 14 / 16,
      [breakpoints.up('md')]: {
        color: palette.primary.main,
        fontSize: pxToRem(14),
        lineHeight: 14 / 24,
      },
    },
    h6: {
      fontSize: pxToRem(10),
      lineHeight: 10 / 16,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(10),
        lineHeight: 10 / 24, // card caption
      },
    },
    body1: {
      color: palette.primary.main,
      fontSize: pxToRem(14),
      lineHeight: 14 / 24,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(20),
        lineHeight: 20 / 40, // 20px
      },
    },
    body2: {
      fontSize: pxToRem(14),
      lineHeight: 14 / 24,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(14),
        lineHeight: 14 / 24, // 14px
      },
    },
    subtitle1: {
      fontSize: pxToRem(14),
      lineHeight: 14 / 24,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(12),
        lineHeight: 12 / 14.4,
      },
    },
    caption: {
      [breakpoints.up('md')]: {
        fontSize: pxToRem(12),
        lineHeight: 12 / 10,
      },
    },
    button: {
      fontSize: pxToRem(14),
      lineHeight: 14 / 18,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(14),
        lineHeight: 14 / 18, // button
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
        color: palette.background.main,
        "&:hover": {
          border: "none",
          boxShadow: "none", // black button
        },
      },
      containedPrimary: {
        backgroundColor: palette.hightlight.main,
        color: palette.background.main,
        border: "none",
        boxShadow: "none", // blue button
      },
      containedSecondary: {
        backgroundColor: palette.secondary.main,
        color: palette.hightlight.main,
        border: "none",
        boxShadow: "none", // grey button
      },
      containedSizeSmall: {
        fontSize: typography.pxToRem(14),
        lineHeight: 18 / 14,
        [breakpoints.up('xl')]: {
          fontSize: typography.pxToRem(16),
        },
      },
      containedSizeLarge: {
        fontSize: typography.pxToRem(16),
        lineHeight: 24 / 16,
        [breakpoints.up('xl')]: {
          fontSize: typography.pxToRem(24),
          lineHeight: 24 / 24,
        },
      },
    },
  },
  { clone: false },
);

export default theme;
