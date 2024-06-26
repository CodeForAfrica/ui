import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {
    width: typography.pxToRem(964),
  },
  lineContainer: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999999,
    pointerEvents: "none",
  },
  line: {
    strokeWidth: typography.pxToRem(1),
    stroke: palette.primary.main,
    fill: palette.primary.main,
  },
}));

export default useStyles;
