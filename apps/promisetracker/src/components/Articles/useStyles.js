import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {
    marginBottom: "4rem",
  },

  grid: {
    marginBottom: typography.pxToRem(64),
    [breakpoints.up("lg")]: {
      marginBottom: typography.pxToRem(32),
    },
  },
  root: {
    width: "calc(((100vw - 100%) / 2) + 100%)",
  },
}));

export default useStyles;
