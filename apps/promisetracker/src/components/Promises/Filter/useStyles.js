import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  root: {
    marginBottom: "1.5rem",
    [breakpoints.up("lg")]: {
      marginBottom: 0,
    },
    display: "flex",
    gap: typography.pxToRem(16),
  },
  name: {
    fontSize: typography.pxToRem(9.6),
    lineHeight: typography.pxToRem(20),
  },
  button: {
    border: `.122rem solid ${palette.primary.dark}`,
    marginRight: ".6rem",
    marginBottom: ".6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      marginRight: ".6rem",
      marginBottom: ".6rem",
      border: `.122rem solid ${palette.primary.dark}`,
    },
  },
  filterContainer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    maxWidth: typography.pxToRem(500),
  },
  label: {
    color: palette.secondary.dark,
  },
}));

export default useStyles;
