import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  buttonContainer: {
    marginTop: "20px",
    flexDirection: "column",
    [breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  button: {
    padding: "35px",
    marginTop: "15px",
    borderRadius: "5px",
    backgroundColor: "#ebebeb",
    color: "#015dfd",
    "&:hover": {
      backgroundColor: "#015dfd",
      color: "#ffffff",
    },
    [breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },
}));

export default useStyles;
