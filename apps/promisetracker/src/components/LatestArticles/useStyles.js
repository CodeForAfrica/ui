import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  section: {},
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  sectionTitle: {
    marginBottom: typography.pxToRem(24),
    marginTop: typography.pxToRem(64),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(35),
    },
  },
  root: {
    width: "calc(((100vw - 100%) / 2) + 100%)",
  },
  cardContainer: {
    display: "flex",
    height: typography.pxToRem(500),
    overflow: "initial",
    marginRight: typography.pxToRem(23),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(462),
    },
  },
  cta: {},
  ctaButton: {},
  scrollBar: {
    // Reinstate scrolling for non-JS clients
    "& .simplebar-content-wrapper": {
      overflow: "auto",
    },
    "& .simplebar-track": {
      backgroundColor: palette.secondary.light,
      borderRadius: 6,
      height: typography.pxToRem(12),
      width: "50%",
    },
    "& .simplebar-track.simplebar-horizontal": {
      marginLeft: "25%",
      [breakpoints.up("lg")]: {
        display: "none",
      },
    },
    "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
      backgroundColor: palette.secondary.dark,
      borderRadius: 6,
      height: typography.pxToRem(12),
      top: 0,
      "&::before": {
        backgroundColor: palette.secondary.dark,
      },
    },
  },
}));

export default useStyles;
