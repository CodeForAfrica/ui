import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  section: {
    marginBottom: "4rem",
  },
  sectionTitle: {},
  grid: {
    marginBottom: typography.pxToRem(20),
  },
  root: {
    width: "calc(((100vw - 100%) / 2) + 100%)",
  },
}));

export default useStyles;
