import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: `${typography.pxToRem(33)} 0`,
    [breakpoints.up("lg")]: {
      margin: `${typography.pxToRem(45)} 0`,
    },
  },
  button: {
    minHeight: typography.pxToRem(48),
    minWidth: typography.pxToRem(98),
    [breakpoints.up("lg")]: {
      minWidth: typography.pxToRem(158),
    },
  },
}));

export default useStyles;
