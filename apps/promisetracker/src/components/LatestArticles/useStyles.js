import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  section: {},
  sectionTitle: {
    marginBottom: typography.pxToRem(24),
    marginTop: typography.pxToRem(64),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(35),
    },
  },
  root: {
    width: "calc(((100vw - 100%) / 2) + 100%)",
  },
  card: {
    maxHeight: 460,
    [breakpoints.up("lg")]: {
      maxHeight: 462,
      minWidth: "auto",
      overflow: "visible",
    },
  },
  cardContainer: {
    display: "flex",
    height: typography.pxToRem(500),
    overflow: "initial",
    marginRight: typography.pxToRem(23),
  },
  cardDescriptionContainer: {
    marginTop: typography.pxToRem(58.49 - 7),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(32 - 7),
    },
  },
  scrollBar: {
    // Reinstate scrolling for non-JS clients
    "& .simplebar-content-wrapper": {
      overflow: "auto",
    },
    "& .simplebar-track": {
      backgroundColor: palette.secondary.light,
      borderRadius: 6,
      height: typography.pxToRem(12),
      width: "50%",
    },
    "& .simplebar-track.simplebar-horizontal": {
      marginLeft: "25%",
      [breakpoints.up("lg")]: {
        display: "none",
      },
    },
    "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
      backgroundColor: palette.secondary.dark,
      borderRadius: 6,
      height: typography.pxToRem(12),
      top: 0,
      "&::before": {
        backgroundColor: palette.secondary.dark,
      },
    },
  },
}));

export default useStyles;
