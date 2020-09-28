import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {},
  status: {
    margin: 0,
    marginRight: typography.pxToRem(10),
  },
  statusContainer: {
    minWidth: typography.pxToRem(80),
    [breakpoints.up("lg")]: {
      minWidth: typography.pxToRem(170),
    },
  },
  description: {},
}));

export default useStyles;
