import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {
    backgroundColor: palette.secondary.light,
    overflow: "visible",
    paddingBottom: typography.pxToRem(18),
    paddingTop: typography.pxToRem(33),
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(32),
      paddingTop: typography.pxToRem(46),
    },
  },
  section: {
    overflow: "visible",
  },
  sectionTitle: {
    margin: 0,
  },
  keyPromise: {
    minWidth: typography.pxToRem(314),
    overflow: "visible",
  },
  keyPromiseCta: {
    [breakpoints.up("lg")]: {
      borderTop: `1px solid ${palette.primary.dark}`,
      justifyContent: "left",
      margin: 0,
      padding: `${typography.pxToRem(45)} 0 0 0`,
    },
  },
  keyPromiseCtaButton: {
    minWidth: typography.pxToRem(158),
    "&:hover": {
      // Generated from palette.highlight.main using https://material-ui.com/customization/color/
      backgroundColor: "#337dfd",
    },
  },
  keyPromiseDescription: {
    fontSize: typography.pxToRem(13),
    height: typography.pxToRem(24 * 4), // Max 4 lines defined by body2.lineHeight
    marginTop: typography.pxToRem(40 - 4),
    maxHeight: typography.pxToRem(24 * 4),
  },
  keyPromiseDetailsGrid: {
    [breakpoints.up("lg")]: {
      order: 1,
    },
  },
  keyPromiseMediaGrid: {
    position: "relative",
    [breakpoints.up("lg")]: {
      order: 2,
    },
  },
  keyPromiseTitle: (props) => ({
    height: typography.pxToRem(32 * 2), // Max 2 lines defined by h3.lineHeight
    marginTop: typography.pxToRem(11),
    maxHeight: typography.pxToRem(32 * 2),
    [breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "column",
      height: "auto",
      marginBottom: typography.pxToRem(8), // Border height
      marginTop: typography.pxToRem(27),
      maxHeight: typography.pxToRem(56 * 2), // Max 2 lines defined by h2.lineHeight
      minHeight: typography.pxToRem(56),
      position: "relative",
      "&:after": {
        content: '""',
        width: typography.pxToRem(72),
        // NOTE(kilemensi): Since this useStyles is shared between KeyPromises
        //                  and KeyPromise, props.status will be null when
        //                  called in KeyPromises, and hence ?
        borderBottom: `8px solid ${props.status?.color}`,
      },
    },
  }),
  mediaContainer: {
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(387),
      marginTop: typography.pxToRem(27),
      position: "relative",
      width: "calc(((100vw - 100%) / 2) + 100%)",
    },
  },
  media: {
    display: "block",
    objectFit: "cover",
    marginTop: typography.pxToRem(25),
    maxHeight: typography.pxToRem(155),
    maxWidth: typography.pxToRem(314),
    width: "100%",
    [breakpoints.up("lg")]: {
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      margin: 0,
      maxHeight: typography.pxToRem(387),
      maxWidth: typography.pxToRem(581),
      right: 0,
      top: 0,
      width: "100%",
    },
  },
  stepper: {
    background: "inherit",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(40),
    },
  },
  stepperButton: {
    color: "#909090",
    fontSize: typography.pxToRem(40),
    "&.Mui-disabled": {
      color: palette.secondary.main,
    },
  },
  stepperDot: {
    backgroundColor: palette.secondary.main,
    border: `1px solid ${palette.secondary.light}`,
    height: typography.pxToRem(8),
    margin: `0 ${typography.pxToRem(8)}`,
    width: typography.pxToRem(8),
    cursor: "pointer",
    [breakpoints.up("xl")]: {
      height: typography.pxToRem(21),
      margin: `0 ${typography.pxToRem(20)}`,
      width: typography.pxToRem(21),
    },
  },
  stepperDotActive: {
    backgroundColor: "#909090",
    border: "1px solid #909090",
    cursor: "default",
  },
  stepperDots: {
    padding: 0,
  },
  timeline: {
    marginTop: typography.pxToRem(41),
  },
  timelineGrid: {
    order: 3,
  },
}));

export default useStyles;
