import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {
    paddingBottom: typography.pxToRem(10),
  },
  grid: {
    [breakpoints.up("md")]: {
      marginRight: typography.pxToRem(10),
    },
  },
  icon: {
    padding: 0,
    background: palette.background.paper,
    "& :hover": {
      background: palette.background.paper,
    },
    height: typography.pxToRem(36),
    width: typography.pxToRem(36),
  },
  select: {
    width: typography.pxToRem(165),
    height: typography.pxToRem(40),
    paddingLeft: 0,
    [breakpoints.up("lg")]: {
      width: typography.pxToRem(200),
    },
  },
  filled: {
    padding: `${typography.pxToRem(10)} ${typography.pxToRem(
      40,
    )} ${typography.pxToRem(10)} ${typography.pxToRem(20)} !important`,
  },
  selectPaper: {
    maxHeight: typography.pxToRem(310),
  },
}));

export default useStyles;
