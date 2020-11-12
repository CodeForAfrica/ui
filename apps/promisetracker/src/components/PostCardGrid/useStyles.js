import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {},
  sectionTitle: {},
  cardGrid: {},
  cardGridItem: {
    marginBottom: typography.pxToRem(20),
  },
  row: {
    paddingTop: typography.pxToRem(30),
    [breakpoints.up("lg")]: {
      paddingTop: typography.pxToRem(16),
    },
  },
}));

export default useStyles;
