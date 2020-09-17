import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  ({ breakpoints, typography, widths, palette }) => ({
    root: {},
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
    initiative: {
      display: "none",
    },
    copyright: {
      "& img": {
        height: typography.caption.fontSize,
        width: typography.caption.fontSize,
      },
    },
    legalLinks: {
      marginTop: "3.09375",
      [breakpoints.up("md")]: {
        marginTop: 0,
      },
    },
    legalLinksLink: {},

    primary: {
      paddingTop: typography.pxToRem(50),
      paddingBottom: typography.pxToRem(50),
      [breakpoints.up("md")]: {
        paddingBottom: typography.pxToRem(50),
      },
    },
    quickLinks: {
      "& ul": {
        marginTop: "0rem",
      },
      "& li": {
        marginTop: ".2rem",
      },
    },
    secondary: {
      backgroundColor: palette.primary.dark,
      color: "white",
      [breakpoints.up("md")]: {
        paddingBottom: "1rem",
        paddingTop: "2rem",
      },
    },
    secondaryGridItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
    },
    stayInTouchLinks: {
      marginTop: "2.215rem",
      "& a": {
        height: "2rem",
        width: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: palette.secondary.dark,
        borderRight: "none",
        marginRight: " .2rem",
      },
      "& img": {
        height: typography.caption.fontSize,
        width: typography.caption.fontSize,
      },
      [breakpoints.up("md")]: {
        marginTop: 0,
      },
    },
    stayInTouch: {
      justifyContent: "flex-end",
    },
    legalContainer: {
      display: "flex",
      alignItems: "start",
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
    },
    ptLogo: {
      maxWidth: "14.75rem",
    },
    links: {},
    link: {
      ...typography.h6,
      color: palette.secondary.dark,
    },
  })
);

export default useStyles;
