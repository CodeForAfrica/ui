import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  root: {
    marginBottom: "1.5rem",
    [breakpoints.up("lg")]: {
      marginBottom: 0,
    },
  },
  button: {
    border: `.122rem solid ${palette.primary.dark}`,
    marginRight: ".6rem",
    marginBottom: ".6rem",
    padding: ".5rem .5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      marginRight: ".6rem",
      marginBottom: ".6rem",
      padding: ".5rem .5rem",
      border: `.122rem solid ${palette.primary.dark}`,
    },
  },
  filterContainer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    maxWidth: typography.pxToRem(300),
  },
  label: {
    color: palette.secondary.dark,
  },
}));

export default useStyles;
