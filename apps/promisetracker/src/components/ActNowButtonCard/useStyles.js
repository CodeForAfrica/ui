import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: "70px",
    maxHeight: "210px",
    height: "210px",
    borderRadius: "10px",
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
    padding: "50px 35px",
    margin: "8px",
    // marginTop: "15px",
    // marginRight: "10px",
    borderRadius: "10px",
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
  cardTitle: {
    marginTop: "10px",
  },
  closeIcon: {
    position: "relative",
    top: "21px",
    left: "95%",
  },
  petitionButtons: {
    display: "flex",
  },
  connectButton: {
    color: "#FD0000",
    width: "300px",
  },
  cardButton: {
    padding: "30px 80px",
    borderRadius: "10px",
  },
  cardButtonRoot: {
    margin: 0,
    width: "auto",
  },
  cardText: {
    fontSize: "15px",
  },
}));

export default useStyles;
