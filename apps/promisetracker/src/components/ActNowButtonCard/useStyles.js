import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: "70px",
    padding: "0",
    borderRadius: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

    "& .MuiIconButton-colorPrimary": {
      backgroundColor: "#EBEBEB",
      margin: "10px",
      padding: "3%",
    },
    [breakpoints.up("sm")]: {
      maxHeight: "210px",
      height: "210px",
    },
  },
  cardContent: {
    padding: "0",
  },
  buttonContainer: {
    marginTop: "20px",
    flexDirection: "column",
    [breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  button: {
    padding: "20px 35px",
    margin: "5px",
    borderRadius: "10px",
    backgroundColor: "#ebebeb",
    color: "#015dfd",
    "&:hover": {
      backgroundColor: "#015dfd",
      color: "#ffffff",
    },
    [breakpoints.up("sm")]: {
      marginTop: 0,
      padding: "50px 35px",
      margin: "8px",
    },
  },
  cardTitle: {
    marginTop: "10px",
  },
  petitionButtons: {
    display: "flex",
  },
  connectButton: {
    color: "#FD0000",
    width: "300px",
  },
  submitButton: {
    margin: "0 0 10px 0",
    height: "58px",
    width: "auto",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "10px",
    [breakpoints.up("sm")]: {
      flexDirection: "unset",
      marginTop: "30px",
    },
  },
  input: {
    margin: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0px",
      border: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#005DFD",
    },
    [breakpoints.up("sm")]: {
      width: "400px",
      margin: 0,
    },
  },

  // submitButton: {
  //   margin: "0 0 10px 0",
  //   width: "auto",
  // },

  cardButton: {
    padding: "20px 80px",
    borderRadius: "10px",
    [breakpoints.up("sm")]: {
      padding: "30px 90px",
    },
  },
  cardButtonRoot: {
    margin: "0 0 10px 0",
    width: "auto",
    [breakpoints.up("sm")]: {
      margin: "20px 0 0 0",
    },
  },
  cardText: {
    fontSize: "15px",
    textAlign: "center",
    margin: "10px",
    [breakpoints.up("sm")]: {
      textAlign: "unset",
      margin: "0",
    },
  },
  iconButton: {
    "& .MuiIconButton-colorPrimary": {
      backgroundColor: "blue",
      color: "blue",
    },
  },
  closeIcon: {
    position: "relative",
    top: "30px",
    left: "90%",
  },
}));

export default useStyles;
