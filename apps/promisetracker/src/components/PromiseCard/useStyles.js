import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {
    [breakpoints.up("lg")]: {
      maxHeight: typography.pxToRem(518),
    },
  },
  content: {},
  contentRoot: {},
  date: {},
  description: {},
  descriptionContainer: {
    height: "auto",
    [breakpoints.up("ld")]: {
      height: 24 * 3, // Max 3 lines defined by body2.lineHeight
    },
  },
  media: {},
  share: {},
  status: (props) => {
    const backgroundColor = props.color || "#909090"; // inconclusive color
    const color = props.textColor || palette.text.primary;

    return {
      backgroundColor,
      borderRadius: 10,
      color,
      fontSize: typography.pxToRem(7),
      fontWeight: 700,
      letterSpacing: 0.28,
      lineHeight: 24 / 7,
      marginTop: typography.pxToRem(17),
      textTransform: "uppercase",
      [breakpoints.up("lg")]: {
        fontSize: typography.pxToRem(10),
        letterSpacing: 0.4,
        lineHeight: 24 / 10,
        marginTop: typography.pxToRem(15),
      },
    };
  },
  title: {},
  titleContainer: {},
}));

export default useStyles;
