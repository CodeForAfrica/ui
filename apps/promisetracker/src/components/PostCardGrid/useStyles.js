import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {},
  sectionTitle: {},
  cardGrid: {},
  cardGridItem: {
    marginBottom: typography.pxToRem(20),
  },
  row: {
    paddingBottom: typography.pxToRem(30),
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(16),
    },
  },
}));

export default useStyles;
