import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    border: "1px solid #EBEBEB",
    minWidth: typography.pxToRem(314),
    [breakpoints.up("lg")]: {},
  },
  content: {
    padding: 0,
  },
  contentRoot: {
    height: "100%",
    padding: `${typography.pxToRem(36)} ${typography.pxToRem(16)}`,
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  supporters: {
    fontSize: typography.pxToRem(10),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  author: {
    color: palette.primary.main,
    fontSize: typography.pxToRem(10),
    fontWeight: "bold",
    marginLeft: typography.pxToRem(20),
    opacity: 0.59,
    textTransform: "uppercase",
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
  title: {},
  titleContainer: {
    height: typography.pxToRem(24 * 2), // Max 2 lines defined by h4.lineHeight
    maxHeight: typography.pxToRem(24 * 2),
    overflow: "hidden",
    alignItems: "flex-start",
  },
  status: {
    backgroundColor: palette.secondary.main,
  },
  cta: {
    color: palette.highlight.main,
    fontSize: typography.pxToRem(10),
    textDecoration: "underline",
    textTransform: "uppercase",
  },
}));

export default useStyles;
