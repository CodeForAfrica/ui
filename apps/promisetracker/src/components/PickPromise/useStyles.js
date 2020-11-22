import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {
    paddingBottom: typography.pxToRem(45),
    paddingTop: typography.pxToRem(45),
  },
  endAdornment: {
    backgroundColor: "#005DFD",
    top: 0,
    height: "59px",
    right: "0px !important",
  },
  popUpIndicator: {
    color: "white",
  },
  clearIndicator: { color: "white" },
  root: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(25)} 0`,
    },
  },
  title: {
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    fontSize: typography.pxToRem(16),
  },
  textContent: {
    fontSize: typography.pxToRem(14),
    paddingTop: typography.pxToRem(8),
    paddingBottom: typography.pxToRem(8),
  },
  cta: {
    padding: "0rem 4rem 0rem 0rem",
    width: "auto",
    justifyContent: "flex-start",
  },

  ctaButton: {
    borderRadius: typography.pxToRem(5),
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
}));

export default useStyles;
