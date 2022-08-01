import makeStyles from "@mui/styles/makeStyles";

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
    margin: `0 ${typography.pxToRem(20)}`,
  },
  textfield: {
    background: "#F7F7F7",
    width: "100%",
    height: typography.pxToRem(150),
    border: "none",
    overflow: "hidden",
    "& .MuiInputBase-input": {
      position: "relative",
      top: "-50px",
    },
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
  name: {
    display: "inline",
  },
  iconButton: {
    backgroundColor: "#EBEBEB",
    marginRight: typography.pxToRem(10),
    padding: "3%",
  },
  cardButtonRoot: {
    margin: 0,
    justifyContent: "unset",
    padding: 0,
  },
  cardButton: {
    border: `1px solid #005DFD`,
    background: "#fff",
    width: "100%",
    padding: 0,
    height: typography.pxToRem(80),
    marginTop: typography.pxToRem(7),
  },
}));

export default useStyles;
