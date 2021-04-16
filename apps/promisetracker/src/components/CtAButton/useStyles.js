import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: `${typography.pxToRem(33)} 0`,
    [breakpoints.up("lg")]: {
      margin: `${typography.pxToRem(45)} 0`,
    },
  },
  button: {
    border: `1px solid ${palette.primary.main}`,
    minHeight: typography.pxToRem(48),
    minWidth: typography.pxToRem(98),
    [breakpoints.up("lg")]: {
      minWidth: typography.pxToRem(158),
    },
    "&:hover": {
      border: `1px solid ${palette.primary.main}`,
      background: palette.background.default,
      color: palette.text.primary,
    },
  },
}));

export default useStyles;
