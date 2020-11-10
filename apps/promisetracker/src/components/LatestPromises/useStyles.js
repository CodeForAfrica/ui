import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {},
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  sectionTitle: {
    marginBottom: typography.pxToRem(21),
    marginTop: typography.pxToRem(46),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(96),
    },
  },
  cta: {},
  ctaButton: {},
  row: {
    paddingTop: typography.pxToRem(30),
    [breakpoints.up("lg")]: {
      paddingTop: typography.pxToRem(16),
    },
  },
  gridItem: {
    [breakpoints.up("lg")]: {
      paddingRight: "1rem",
      paddingLeft: "1rem",
    },
  },
}));

export default useStyles;
