import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {
    zIndex: 1,
    position: "relative",
    paddingBottom: `${typography.pxToRem(70)} !important`,
    paddingTop: `${typography.pxToRem(70)} !important`,
    [breakpoints.up("lg")]: {
      paddingBottom: `${typography.pxToRem(100)} !important`,
      paddingTop: `${typography.pxToRem(100)} !important`,
    },
  },
}));

export default useStyles;
