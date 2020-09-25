import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    // Seems like you need height defined for AppBar position="sticky" to work
    // see: https://github.com/mui-org/material-ui/issues/16186
    height: "100vh",
    // font-boosting: https://stackoverflow.com/questions/13430897/how-to-override-font-boosting-in-mobile-chrome#comment61478376_16432702
    maxHeight: 999999,
    overflowX: "hidden",
  },
  section: {},
  footer: {
    marginTop: typography.pxToRem(56),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(80),
    },
  },
}));

export default useStyles;
