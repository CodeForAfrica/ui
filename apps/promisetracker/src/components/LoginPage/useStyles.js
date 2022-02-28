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
    marginBottom: "1rem",
    marginTop: typography.pxToRem(40),
    paddingLeft: typography.pxToRem(2),
    paddingRight: "2rem",
    color: "#4285F4",
    borderRadius: 0,
    "&:hover": {
      textDecoration: "none",
      color: "#4285F4",
      backgroundColor: palette.background.default,
    },
    backgroundColor: palette.background.default,
    boxShadow: `2px 2px 5px rgba(0, 0, 0, 0.25)`,
    height: "3rem",
    [breakpoints.up("lg")]: {
      height: "3.5rem",
    },
  },
  buttonContainer: {
    [breakpoints.up("md")]: {
      width: "400px",
    },
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
  container: {
    background: "#F7F7F7",
    padding: typography.pxToRem(30),
    marginTop: typography.pxToRem(80),
    marginBottom: typography.pxToRem(80),
  },

  signinText: { marginLeft: typography.pxToRem(30), fontWeight: 700 },
}));

export default useStyles;
