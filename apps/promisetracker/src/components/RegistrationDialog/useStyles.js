import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {},
  actions: {
    [breakpoints.up("lg")]: {
      margin: `
        ${typography.pxToRem(23)}
        ${typography.pxToRem(51.5)}
        ${typography.pxToRem(38.61)}
        ${typography.pxToRem(35)}
    `,
      width: typography.pxToRem(629.5),
    },
  },
  button: {
    border: `1px solid ${palette.highlight.main}`,
    color: palette.highlight.main,
    height: typography.pxToRem(48),
    marginBottom: typography.pxToRem(8),
    width: "100%",
    "&:hover": {
      backgroundColor: palette.highlight.main,
      border: `1px solid ${palette.highlight.main}`,
      color: palette.text.secondary,
    },
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(81),
      marginBottom: 0,
      width: typography.pxToRem(298),
    },
  },
}));

export default useStyles;
