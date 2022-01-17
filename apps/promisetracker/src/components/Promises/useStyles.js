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
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "row",
    marginTop: "1rem",
    [breakpoints.up("lg")]: {
      alignItems: "flex-end",
    },
  },
  sectionTitle: {
    margin: "2rem 0rem",
  },
  chips: {
    marginTop: typography.pxToRem(26),
  },
  chip: {
    borderRadius: 0,
    marginRight: typography.pxToRem(16),
  },
}));

export default useStyles;
