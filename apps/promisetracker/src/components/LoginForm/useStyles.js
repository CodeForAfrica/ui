import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  authButton: {
    backgroundColor: palette.primary.dark,
    color: palette.common.white,
    marginTop: typography.pxToRem(20),
    minWidth: typography.pxToRem(74),
    "&:hover": {
      backgroundColor: palette.primary.dark,
    },
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(15),
      paddingTop: typography.pxToRem(14),
      minWidth: typography.pxToRem(158),
    },
  },
  input: {
    paddingLeft: typography.pxToRem(10),
    fontFamily: typography.h5.fontFamily,
    fontSize: typography.h5.fontSize,
  },
}));

export default useStyles;
