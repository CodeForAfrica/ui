import { deepmerge } from '@material-ui/utils';

import createTheme from '@hurumap-ui/charts/styles/createTheme';

const FONT_FAMILY_HEADING = '"Source Serif Pro", serif';
const FONT_FAMILY_TEXT = '"Source Sans Pro", "sans-serif"';

// ## DEFAULT
const theme = createTheme({
  palette: {
    background: { default: '#fff' },
    primary: { main: '#E04F00', light: '#FFF4F0', dark: '#E04E12' },
    secondary: {
      main: '#2B0F03',
      light: '#EFEFEF',
      dark: '#2C2C2C',
      faded: '#818080',
    },
    highlight: { main: '#2D0183', light: '#E4DAF5', dark: '#31018F' },
    text: { primary: '#000', secondary: '#fff', heading: '#21201A' },
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT,
    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: 0,
    },
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: 0,
    },
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 400,
      letterSpacing: 0,
    },
    h4: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 400,
      letterSpacing: 0,
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 400,
      letterSpacing: 0,
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 700,
      letterSpacing: 0,
    },
    body1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0,
      fontWeight: 400,
    },
    body2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 400,
      letterSpacing: 0,
    },
    caption: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0,
    },
    button: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: 'none',
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
    MuiBackdrop: {
      root: {
        backgroundColor: 'transparent',
      },
    },
  },
  widths: {
    values: {
      md: 912, // 0, 24, 0, 24 margins
      lg: 1200, // 0, 40, 0, 40 margins
      xl: 1640, // 0, 140, 0, 140 margins DESIGNS
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
      color: palette.text.heading,
      fontSize: pxToRem(32),
      fontStretch: 'semi-condensed',
      lineHeight: 44 / 32,
      textShadow: '0 3px 6px #8134042F',
      [breakpoints.up('md')]: {
        fontSize: pxToRem(55),
        lineHeight: 75 / 55,
      },
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(80),
        lineHeight: 110 / 80,
      },
    },
    h2: {
      color: palette.text.heading,
      fontSize: pxToRem(28),
      fontStretch: 'semi-condensed',
      lineHeight: 38 / 28,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(45),
        lineHeight: 62 / 45,
      },
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(60),
        lineHeight: 82 / 60,
      },
    },
    h3: {
      color: palette.text.heading,
      fontSize: pxToRem(20),
      lineHeight: 25 / 20,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(30),
        lineHeight: 38 / 30,
      },
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(45),
        lineHeight: 56 / 45,
      },
    },
    h4: {
      color: palette.text.heading,
      fontSize: pxToRem(18),
      lineHeight: 23 / 18,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(24),
        lineHeight: 31 / 24,
      },
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(36),
        lineHeight: 45 / 36,
      },
    },
    h5: {
      color: palette.text.heading,
      fontSize: pxToRem(16),
      lineHeight: 20 / 16,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(20),
        lineHeight: 31 / 20,
      },
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(28),
        lineHeight: 36 / 28,
      },
    },
    subtitle1: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(28),
        lineHeight: 45 / 28,
      },
    },
    subtitle2: {
      fontSize: pxToRem(16),
      lineHeight: 23 / 16,
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(24),
        lineHeight: 30 / 24,
      },
    },
    body1: {
      fontSize: pxToRem(14),
      lineHeight: 18 / 14,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(18),
        lineHeight: 23 / 18,
      },
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(24),
        lineHeight: 31 / 24,
      },
    },
    body2: {
      fontSize: pxToRem(12),
      lineHeight: 15 / 12,
      [breakpoints.up('md')]: {
        fontSize: pxToRem(16),
        lineHeight: 20 / 16,
      },
    },
    caption: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(20),
        lineHeight: 30 / 20,
      },
    },
    button: {
      fontSize: pxToRem(12),
      lineHeight: 15 / 12,
      letterSpacing: pxToRem(1.6),
      [breakpoints.up('xl')]: {
        fontSize: pxToRem(20),
        lineHeight: 24 / 20,
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
        backgroundColor: palette.primary.main,
        border: 'none',
        boxShadow: 'none',
        color: palette.text.secondary,
        '&:hover': {
          border: 'none',
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        backgroundColor: palette.primary.main,
        border: 'none',
        boxShadow: 'none',
        color: palette.text.secondary,
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
