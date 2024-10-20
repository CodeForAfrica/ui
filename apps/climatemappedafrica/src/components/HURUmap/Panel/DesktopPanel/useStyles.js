import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(
  ({ typography, palette, transitions, widths, zIndex }) => ({
    root: {
      display: "flex",
      height: "100%",
      minWidth: typography.pxToRem(1049),
      maxWidth: "max-content",
      transition: transitions.create("width", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
      visibility: "hidden",
    },
    paper: {
      background: "transparent",
      border: "none",
      display: "flex",
      flexDirection: "row",
      position: "unset",
      width: "100%",
      overflowY: "visible",
    },
    panelButtons: {
      marginTop: typography.pxToRem(113),
      width: typography.pxToRem(44),
      position: "fixed",
      left: 0,
      zIndex: zIndex.drawer + 1,
      top: typography.pxToRem(110),
    },
    panelButtonsOpen: {
      left: `max(calc((100vw - ${widths.values.lg}px)/2 + 833px),1054px)`,
    },
    tabPanel: {
      width: `calc(100% - ${typography.pxToRem(44)})`,
      height: "100%",
      background: palette.background.default,
      display: "flex",
    },
  }),
);

export default useStyles;
