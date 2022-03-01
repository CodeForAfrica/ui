import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    flexGrow: 1,
  },
  sectionTitle: {
    margin: 0,
    textAlign: "center",
    width: "100%",
    [breakpoints.up("lg")]: {
      textAlign: "left",
    },
  },
  loginButton: {
    color: palette.common.white,
    marginTop: typography.pxToRem(20),
    minWidth: typography.pxToRem(74),
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(15),
      paddingTop: typography.pxToRem(14),
      minWidth: typography.pxToRem(158),
    },
    backgroundColor: palette.google.main,
    width: "100%",
    "&:hover": {
      backgroundColor: palette.google.main,
    },
  },
  buttonContainer: {
    "& .MuiLink-underlineHover": {
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  item: {
    color: palette.text.primary,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: typography.pxToRem(22),
  },
  error: {
    color: palette.error.main,
    marginTop: typography.pxToRem(22),
  },
  formButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
    padding: typography.pxToRem(30),
    marginTop: typography.pxToRem(80),
    marginBottom: typography.pxToRem(80),
  },

  signinText: { marginLeft: typography.pxToRem(30), fontWeight: 700 },
}));

export default useStyles;
