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
  },
  title: {
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    fontSize: typography.pxToRem(16),
    position: "static",
    transform: "none",
    color: "black",
  },
  inputSection: {
    backgroundColor: "#F7F7F7",
    border: "0.06rem solid #EBEBEB",
    // color: "#20202059", // this is the original color in the design
    color: "black", // I set it to black due to color contrast issues - Gertrude (resolve with designer)
    padding: "0.313rem",
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
    width: "1.3em",
    height: "1.45em",
    right: 0,
    borderRadius: `0 ${typography.pxToRem(5)} ${typography.pxToRem(5)} 0`,
  },
  formControl: {
    width: "-webkit-fill-available",
    "& .MuiInputBase-root": {
      width: "40%",
    },
    [breakpoints.down("sm")]: {
      "& .MuiInputBase-root": {
        width: "85%",
      },
    },
  },
  textContent: {
    fontSize: typography.pxToRem(14),
    padding: "0.5rem 0 0.75rem 0",
    color: "black",
    fontFamily: "inherit",
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
  mandatoryText: {
    fontSize: typography.pxToRem(15),
    paddingTop: "0.625rem",
  },
}));

export default useStyles;
