import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {},
  paperScrollBody: {
    margin: 0,
  },
  paperWidthSm: {
    maxWidth: typography.pxToRem(716),
  },
  scrollBody: {
    margin: `${typography.pxToRem(40)} ${typography.pxToRem(13)}`,
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    [breakpoints.down("sm")]: {
      "& .MuiDialog-paperWidthSm.MuiDialog-paperScrollBody": {
        maxWidth: "100%",
      },
    },
  },
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    borderRadius: `0 0 ${typography.pxToRem(10)} ${typography.pxToRem(10)}`,
    border: "1px solid #ebebeb",
    padding: ` ${typography.pxToRem(16)}
    ${typography.pxToRem(15)}
    ${typography.pxToRem(16)}
    ${typography.pxToRem(51)}`,
    height: typography.pxToRem(100),
    "& h2": {
      textTransform: "none",
      fontWeight: "100",
      [breakpoints.down("sm")]: {
        fontSize: typography.pxToRem(23),
      },
    },
    [breakpoints.down("sm")]: {
      padding: `${typography.pxToRem(15)}
      ${typography.pxToRem(10)}
      ${typography.pxToRem(15)}
      ${typography.pxToRem(15)}`,
    },
  },
  iconRoot: {
    color: "#909090",
  },
  dialogContent: {
    padding: `${typography.pxToRem(51)} ${typography.pxToRem(51)}`,
    [breakpoints.down("sm")]: {
      padding: `${typography.pxToRem(15)} ${typography.pxToRem(15)}`,
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
    fontFamily: typography.h4.fontFamily,
    fontWeight: typography.h4.fontWeight,
    letterSpacing: typography.h4.letterSpacing,
    fontSize: typography.pxToRem(16),
  },
  recipientLabel: {
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontWeight: "bold",
    fontSize: typography.pxToRem(10),
    color: "#909090",
    position: "static",
    marginBottom: typography.pxToRem(10),
  },
  helperText: {
    color: "black",
    margin: `0 0 ${typography.pxToRem(10)} 0`,
    lineHeight: "1.8",
    [breakpoints.down("sm")]: {
      paddingTop: typography.pxToRem(10),
    },
  },
  mandatoryText: {
    margin: `${typography.pxToRem(10)} 0 ${typography.pxToRem(10)} 0`,
  },
  input: {
    border: "1px solid #EBEBEB",
    backgroundColor: "#F7F7F7",
    borderRadius: typography.pxToRem(5),
    marginTop: 0,
  },
  underline: {
    "&::before": {
      borderBottom: 0,
    },
  },
  inputRoot: { order: 3, marginTop: 0 },
  formControl: {
    width: "100%",
    marginTop: typography.pxToRem(40),
    "& textarea": {
      backgroundColor: "#F7F7F7",
      border: "1px solid #EBEBEB",
    },
    "& .MuiInput-formControl": {
      marginTop: 0,
    },
  },
  formControlRecipient: {
    width: "100%",
  },
  body1: {
    marginTop: typography.pxToRem(40),
  },
  imageInput: {
    backgroundColor: "#F7F7F7",
    height: typography.pxToRem(50),
    minWidth: "100%",
    "& input": {
      display: "none",
    },
  },
  imageThumbnail: {
    width: typography.pxToRem(150),
    height: typography.pxToRem(150),
    objectFit: "contain",
    marginLeft: typography.pxToRem(30),
  },
  imageContainer: {
    backgroundColor: "#F7F7F7",
  },
  gridContainer: {
    justifyContent: "center",
  },
  uploadButton: {
    color: "#909090",
    backgroundColor: "#FFFFFF",
    border: "1px solid #909090",
    borderRadius: typography.pxToRem(10),
    fontSize: typography.pxToRem(12),
    "&:hover": {
      color: "#005DFD",
    },
  },
  button: {
    margin: 0,
    paddingBottom: typography.pxToRem(30),
  },
  inputText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontSize: typography.pxToRem(12),
    fontWeight: "bold",
    color: "#20202059",
    letterSpacing: "0.4px",
    lineHeight: "3",
    width: typography.pxToRem(120),
  },
}));

export default useStyles;
