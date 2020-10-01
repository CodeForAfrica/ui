import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    [breakpoints.up("lg")]: {
      maxHeight: typography.pxToRem(518),
    },
  },
  content: {},
  contentRoot: (props) => {
    const borderColor = (props.status && props.status.color) || "#909090"; // inconclusive color
    return {
      [breakpoints.up("lg")]: {
        position: "relative",
        "&:after": {
          content: '""',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
        },
        "&:hover": {
          "&:after": {
            boxShadow: "0 0px 4px 4px #0000001A",
            borderTop: `10px solid ${borderColor}`,
          },
        },
        maxHeight: typography.pxToRem(518),
      },
    };
  },
  date: {},
  description: {
    textTransform: "none",
  },
  descriptionContainer: {
    height: "auto",
    [breakpoints.up("lg")]: {
      height: 24 * 3, // Max 3 lines defined by body2.lineHeight
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
  status: {},
  title: {},
  titleContainer: {},
}));

export default useStyles;
