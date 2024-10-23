import makeStyles from "@mui/styles/makeStyles";

// We can't migrate these styles to sx until components/Tabs is upgraded
const useStyles = makeStyles(
  ({ typography, palette, zIndex, breakpoints }) => ({
    tabs: {
      paddingTop: typography.pxToRem(16),
      paddingBottom: typography.pxToRem(16),
      paddingLeft: typography.pxToRem(20),
      backgroundColor: palette.background.paper,
      zIndex: zIndex.appBar,
      width: "100%",
      position: "sticky",
      top: 64, // below navbar
      [breakpoints.up("md")]: {
        paddingLeft: typography.pxToRem(62),
      },
    },
    tabsDivider: {
      display: "none",
    },
    tab: {
      color: "#212529",
      backgroundColor: palette.background.default,
      fontWeight: 500,
      fontSize: typography.pxToRem(12),
      letterSpacing: typography.pxToRem(1.6),
      lineHeight: 30 / 12,
      marginRight: typography.pxToRem(20),
      padding: `${typography.pxToRem(6)} ${typography.pxToRem(20)}`,
      height: typography.pxToRem(29),
      maxWidth: "unset",
      textTransform: "unset",
      "&:last-of-type": {
        marginRight: 0,
      },
    },
    tabIndicator: {
      display: "none",
    },
    tabPanels: {
      marginTop: 0,
    },
    tabSelected: {
      "&.Mui-selected": {
        color: palette.background.default,
      },
      backgroundColor: "#666666",
      "&:hover, &:focus, &$selected": {
        color: palette.background.default,
        backgroundColor: "#666666",
      },
    },
  }),
);

export default useStyles;
