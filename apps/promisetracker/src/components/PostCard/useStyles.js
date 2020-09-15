import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    border: "1px solid #EBEBEB",
    minWidth: typography.pxToRem(314),
    marginRight: typography.pxToRem(23),
    [breakpoints.up("lg")]: {
      marginRight: typography.pxToRem(21),
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
    padding: "2rem 1rem",
  },
  description: {},
  descriptionContainer: {
    height: 24 * 3, // Max 3 lines defined by body2.lineHeight
    maxHeight: 24 * 3,
    overflow: "hidden",
  },
  media: {
    display: "block",
    marginTop: typography.pxToRem(19),
    marginBottom: typography.pxToRem(21),
    maxHeight: typography.pxToRem(185),
    maxWidth: typography.pxToRem(277),
    width: "100%",
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(210),
      maxHeight: typography.pxToRem(210),
      margin: "1rem 0 2rem 0",
      maxWidth: typography.pxToRem(315),
      width: "auto",
    },
  },
  share: {
    display: "none",
    [breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  title: {},
  titleContainer: {
    height: 24 * 2, // Max 2 lines defined by h4.lineHeight
    maxHeight: 24 * 2,
    overflow: "hidden",
  },
}));

export default useStyles;
