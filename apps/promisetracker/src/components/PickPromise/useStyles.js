import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {
    paddingBottom: typography.pxToRem(45),
    paddingTop: typography.pxToRem(45),
  },
  root: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: typography.pxToRem(40),
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(70)} 0`,
    },
    "& fieldset": {
      border: "1px solid #EBEBEB",
    },
  },
  title: {
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    fontSize: typography.pxToRem(16),
    position: "static",
    transform: "none",
    color: "black",
    [breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  inputSection: {
    backgroundColor: "#F7F7F7",
    color: "#20202059",
    padding: typography.pxToRem(12),
    fontFamily: typography.fontFamily,
    fontSize: typography.pxToRem(10),
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingLeft: "0.625rem",
  },
  icon: {
    backgroundColor: "#005DFD",
    color: "#FFFFFF",
    top: "0",
    width: "2em",
    height: "100%",
    right: 0,
    position: "relative",
    border: "solid 10px #005DFD",
  },
  formControl: {
    width: "100%",
    "& .MuiInputBase-root": {
      height: typography.pxToRem(47),
      borderRadius: 0,
    },
  },

  textContent: {
    fontSize: typography.pxToRem(14),
    padding: "0 0 1.3rem 0",
    color: "black",
    fontFamily: typography.body1.fontFamily,
    [breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  cta: {
    padding: "0rem 2rem 0rem 0rem",
    width: "auto",
    justifyContent: "flex-start",
    [breakpoints.down("sm")]: {
      padding: 0,
      justifyContent: "center",
    },
  },

  ctaButton: {
    borderRadius: typography.pxToRem(5),
    fontFamily: typography.fontFamily,
    fontSize: typography.pxToRem(14),
    minWidth: typography.pxToRem(272),
    padding: typography.pxToRem(25),
    "&:hover": {
      backgroundColor: "#005DFD",
      color: "white",
    },
  },
  buttonContainer: {
    display: "flex",
    [breakpoints.down("sm")]: {
      display: "block",
    },
  },
  mandatoryText: {
    fontSize: typography.pxToRem(15),
    paddingTop: "0.625rem",
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default useStyles;
