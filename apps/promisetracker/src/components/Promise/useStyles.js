import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  ({ breakpoints, typography, palette, widths }) => ({
    section: {
      padding: `0 ${typography.pxToRem(23)}`,
      margin: 0,
      width: "100%",
      [breakpoints.up("lg")]: {
        padding: 0,
        margin: "0 auto",
        width: typography.pxToRem(widths.values.lg),
      },
    },
    mobileStatus: {
      marginTop: 0,
    },
    mobileStatusContainer: {
      display: "flex",
      alignItems: "center",
    },
    mobileStatusLabel: {
      marginRight: "1rem",
    },
    promiseBody: {
      margin: "2rem 0",
    },
    promiseTitle: {
      fontWeight: 600,
      marginTop: typography.pxToRem(11),
      marginBottom: typography.pxToRem(11),
      maxHeight: typography.pxToRem(32 * 2),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(27),
        maxHeight: typography.pxToRem(56 * 2),
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: typography.pxToRem(72),
          borderBottom: `8px solid ${palette.highlight.light}`,
        },
      },
    },
    featuredImageContainer: {
      backgroundImage: (props) => `url(${props.image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      height: typography.pxToRem(210),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(477),
      },
    },
    link: {
      color: "unset",
      "&:hover": {
        textDecoration: "none",
        color: "unset",
      },
    },

    label: {
      marginTop: "2rem",
      color: palette.primary.main,
    },
    status: {
      fontSize: "1rem",
      padding: "1.5rem 1rem",
    },
    title: {
      marginBottom: "2rem",
    },
  })
);

export default useStyles;
