import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {},
  root: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(25)} 0`,
    },
  },
  title: {
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    "& h2": {
      textTransform: "none",
      fontFamily: "Amiri, Regular",
      fontSize: typography.pxToRem(30),
      fontWeight: "100",
    },
  },
  description: {
    color: "black",
  },
  label: {
    color: "black",
    position: "static",
    transform: "none",
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    fontSize: typography.pxToRem(16),
  },
  recipientLabel: {
    textTransform: "uppercase",
    fontFamily: "Open Sans, Bold",
    fontWeight: 600,
    fontSize: typography.pxToRem(10),
    color: "#909090",
    position: "static",
    marginBottom: "10px",
  },
  helperText: {
    color: "black",
    fontFamily: "inherit",
    marginBottom: "10px",
    fontSize: typography.pxToRem(14),
    lineHeight: "1.8",
  },
  input: {
    border: "1px solid #EBEBEB",
    backgroundColor: "#F7F7F7",
    borderRadius: "5px",
  },
  underline: {
    "&::before": {
      borderBottom: 0,
    },
  },
  formControl: {
    width: "100%",
    marginTop: "40px",
    "& textarea": {
      backgroundColor: "#F7F7F7",
      border: "1px solid #EBEBEB",
    },
  },
  formControlRecipient: {
    width: "100%",
  },
  body1: {
    marginTop: "40px",
  },
  imageInput: {
    backgroundColor: "#F7F7F7",
    height: "50px",
    minWidth: "-webkit-fill-available",
    "& input": {
      display: "none",
    },
    "&::before": {
      borderBottom: "none",
    },
    "&::after": {
      borderBottom: "none",
    },
  },
  imageThumbnail: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
    marginLeft: "30px",
  },
  imageContainer: {
    backgroundColor: "#F7F7F7",
  },
  uploadButton: {
    color: "#909090",
    backgroundColor: "#FFFFFF",
    border: "1px solid #909090",
    borderRadius: "10px",
    "&:hover": {
      color: "#005DFD",
    },
  },
  button: {
    margin: 0,
    paddingBottom: "30px",
  },
  inputText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Source Sans Pro, sans-serif",
    color: "#20202059",
    fontWeight: "600",
    letterSpacing: "0.4px",
    paddingTop: "10px",
  },
}));

export default useStyles;
