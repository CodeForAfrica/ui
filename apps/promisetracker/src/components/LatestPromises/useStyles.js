import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {},
  sectionTitle: {
    marginBottom: typography.pxToRem(21),
    marginTop: typography.pxToRem(46),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(96),
    },
  },
  row: {
    paddingTop: typography.pxToRem(30),
    [breakpoints.up("lg")]: {
      paddingTop: typography.pxToRem(16),
    },
  },
}));

export default useStyles;
