import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  documentContainer: {
    display: "flex",
    flexDirection: "column",
  },
  document: {
    width: "100%",
    marginBottom: "1.5rem",
  },
  root: {
    padding: "3rem 2.5rem 3rem 2.5rem",
    margin: "4rem 0",
    background: "#F7F7F7 0% 0% no-repeat padding-box",
  },
  titleShareContainer: {
    fontSize: typography.h4.fontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2.5rem",
  },
  share: {
    paddingTop: ".1rem",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  image: {
    width: "100%",
  },
  name: {
    textAlign: "center",
  },
}));

export default useStyles;
