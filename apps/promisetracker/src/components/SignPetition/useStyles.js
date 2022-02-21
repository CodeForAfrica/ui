import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  section: {},
  root: {
    marginBottom: typography.pxToRem(17),
  },
  signature: {
    marginBottom: typography.pxToRem(20),
  },
  signatures: {
    borderBottom: `solid 1px black`,
  },
  sign: {
    margin: `${typography.pxToRem(20)} 0`,
  },
  input: {
    position: "static",
    height: typography.pxToRem(150),
  },
  textfield: {
    background: "#F7F7F7",
    width: "100%",
    height: typography.pxToRem(150),
    border: "none",
  },
  textFieldLabel: {
    color: "#202020",
    fontSize: typography.pxToRem(14),
    opacity: "0.5",
  },
  checkbox: {
    color: "#909090",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: typography.pxToRem(10),
    color: "#909090",
    "& span": {
      color: "#000",
    },
  },
}));

export default useStyles;
