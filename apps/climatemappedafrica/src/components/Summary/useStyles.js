import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {
    paddingBottom: typography.pxToRem(80),
    paddingTop: typography.pxToRem(80),
  },
  container: {
    [breakpoints.up("md")]: {
      margin: typography.pxToRem(0),
    },
    "& p": {
      paddingBottom: typography.pxToRem(24),
      marginTop: 0,
    },
    "& img": {
      width: "100%",
      maxWidth: "100%",
      objectFit: "contain",
      height: "auto",
    },
    "& .wp-block-image": {
      width: "100%",
      maxWidth: "100%",
      margin: 0,
      marginTop: typography.pxToRem(20),
      marginBottom: typography.pxToRem(20),
    },
  },
}));

export default useStyles;
