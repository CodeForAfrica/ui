import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {
    zIndex: 1,
    position: "relative",
    paddingTop: typography.pxToRem(62),
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(42)} 0`,
    },
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(64)} 0`,
    },
  },
}));

export default useStyles;
