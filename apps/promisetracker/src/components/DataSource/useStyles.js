import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  documentContainer: {
    display: "flex",
  },
  document: {
    flex: 1,
  },
  root: {
    padding: "3rem 1rem 3rem 1rem",
    margin: "4rem 0",
    background: "#F7F7F7 0% 0% no-repeat padding-box",
  },
  shareContainer: {
    fontSize: typography.h4.fontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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
  title: {
    textAlign: "center",
  },
}));

export default useStyles;
