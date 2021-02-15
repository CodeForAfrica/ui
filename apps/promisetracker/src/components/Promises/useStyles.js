import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  filterGrid: {
    marginBottom: typography.pxToRem(32),
    marginTop: typography.pxToRem(16),
  },
  promisesContainer: {
    marginBottom: typography.pxToRem(32),
  },
  section: {
    marginBottom: "2rem",
  },
  label: {
    color: palette.secondary.dark,
    paddingRight: "0.5rem",
  },
  sortItems: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    [breakpoints.up("lg")]: {
      alignItems: "flex-end",
    },
  },
  sectionTitle: {
    margin: "2rem 0rem",
  },
}));

export default useStyles;
