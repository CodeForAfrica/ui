import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    marginRight: typography.pxToRem(23),
    [breakpoints.up("lg")]: {
      marginRight: typography.pxToRem(21),
    },
  },
  content: {},
  contentRoot: {},
  date: {},
  description: {
    textTransform: "none",
  },
  descriptionContainer: {
    marginTop: typography.pxToRem(58.49 - 7),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(32 - 7),
    },
  },
  link: {
    color: "unset",
    "&:hover": {
      textDecoration: "none",
      color: "unset",
    },
  },
  media: {},
  share: {},
  title: {},
  titleContainer: {},
}));

export default useStyles;
