import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    border: "1px solid #EBEBEB",
    minWidth: typography.pxToRem(314),
    maxHeight: typography.pxToRem(460),
    [breakpoints.up("lg")]: {
      marginRight: typography.pxToRem(21.5),
      maxHeight: typography.pxToRem(462),
      minWidth: "auto",
      overflow: "visible",
      width: typography.pxToRem(347),
      "&:last-of-type": {
        marginRight: 0,
      },
    },
  },
  content: {
    padding: 0,
  },
  contentRoot: {
    height: "100%",
    padding: "2rem 1rem",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  date: {
    lineHeight: 14 / 10,
    margin: "1rem 0",
    opacity: 0.59, // #20202059
  },
  description: {},
  descriptionContainer: {
    height: typography.pxToRem(24 * 3), // Max 3 lines defined by body2.lineHeight
    marginTop: typography.pxToRem(21 - 9),
    maxHeight: typography.pxToRem(24 * 3),
    overflow: "hidden",
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(30 - 7),
    },
  },

  media: {
    display: "block",
    marginTop: typography.pxToRem(19 - 16),
    maxHeight: typography.pxToRem(185),
    maxWidth: typography.pxToRem(277),
    width: "100%",
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(210),
      maxHeight: typography.pxToRem(210),
      margin: 0,
      maxWidth: typography.pxToRem(315),
      width: "auto",
    },
  },
  share: {
    position: "absolute",
    right: 0,
    zIndex: 999,
  },
  title: {},
  titleContainer: {
    height: typography.pxToRem(24 * 2), // Max 2 lines defined by h4.lineHeight
    maxHeight: typography.pxToRem(24 * 2),
    overflow: "hidden",
    alignItems: "flex-start",
  },
}));

export default useStyles;
