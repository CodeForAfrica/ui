import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, palette }) => ({
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
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  sectionTitle: {
    margin: "2rem 0rem",
  },
}));

export default useStyles;
