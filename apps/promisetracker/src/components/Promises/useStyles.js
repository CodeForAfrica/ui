import makeStyles from "@mui/styles/makeStyles";

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
    paddingTop: "0.4rem",
  },
  sortItems: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "row",
    marginTop: "4rem",
    [breakpoints.up("lg")]: {
      alignItems: "center",
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
