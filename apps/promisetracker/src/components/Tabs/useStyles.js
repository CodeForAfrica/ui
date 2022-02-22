import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    flexGrow: 1,
  },
  indicator: {
    backgroundColor: palette.primary.main,
    height: 2,
    marginBottom: 0,
  },
  divider: {
    marginTop: typography.pxToRem(-2),
    height: typography.pxToRem(2),
  },
  tabs: {
    minHeight: typography.pxToRem(23),
    textTransform: "none",
  },
  tab: {
    color: "#666666",
    fontWeight: 600,
    fontSize: typography.h5.fontSize,
    letterSpacing: typography.h5.letterSpacing,
    lineHeight: typography.h5.lineHeight,
    marginRight: typography.pxToRem(2),
    minHeight: typography.pxToRem(23),
    minWidth: 0,
    padding: `0 ${typography.pxToRem(4)} ${typography.pxToRem(4)}`,
    textTransform: "uppercase",
    "&:last-of-type": {
      marginRight: 0,
    },
  },
  tabSelected: {
    color: palette.primary.main,
    "&:hover, &:focus, &$selected": {
      color: palette.primary.main,
      cursor: "default",
    },
  },
  tabPanel: {},
  tabPanels: {
    marginTop: typography.pxToRem(40),
  },
}));

export default useStyles;
