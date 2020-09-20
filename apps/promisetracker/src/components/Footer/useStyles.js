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
      display: "block",
      marginTop: "1.5rem",
    },
    copyright: {
      marginTop: "2rem",
      order: "inherit",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      flexDirection: "row-reverse",
      [breakpoints.up("md")]: {
        marginTop: 0,
      },
      "& a": {
        display: "flex",
        alignItems: "center",
        marginRight: ".6rem",
      },
      "& img": {
        marginLeft: "0rem",
        height: typography.h5.fontSize,
        width: typography.h5.fontSize,
      },
    },
    copyrightText: {
      fontWeight: 400,
      color: palette.secondary.dark,
    },

    legalLinksLink: {},

    primary: {
      background: palette.secondary.light,
      paddingTop: typography.pxToRem(50),
      paddingBottom: typography.pxToRem(50),
      [breakpoints.up("md")]: {
        paddingBottom: typography.pxToRem(50),
      },
    },
    quickLinks: {
      marginTop: "4rem",
      [breakpoints.up("md")]: {
        marginTop: "0rem",
      },
      "& ul": {
        marginTop: "0rem",
      },
      "& li": {
        marginTop: ".8rem",
      },
    },
    secondary: {
      backgroundColor: palette.primary.dark,
      color: palette.secondary.dark,
      padding: "3rem 0rem",
    },

    secondaryGridItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      [breakpoints.up("md")]: {
        alignItems: "start",
      },
    },
    stayInTouchLinks: {
      marginTop: "2.215rem",
      "& a": {
        height: "3rem",
        width: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: palette.secondary.main,
        borderRight: "none",
        marginRight: " .2rem",
      },
      "& img": {
        height: "1.25rem",
        width: "1.25rem",
      },
      [breakpoints.up("md")]: {
        marginTop: 0,
      },
    },
    stayInTouch: {
      justifyContent: "flex-end",
    },
    stayInTouchText: {
      color: palette.secondary.dark,
      fontWeight: 400,
    },
    legalContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      [breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "flex-start",
      },
    },
    legalLinksRoot: {
      marginTop: "2rem",
      textAlign: "center",
      width: "100%",
      [breakpoints.up("md")]: {
        marginTop: "0rem",
        width: "auto",
        textAlign: "right",
      },
    },
    legalLinks: {
      "& li": {
        paddingBottom: "1rem",
      },
      [breakpoints.up("md")]: {
        "& li": {
          padding: "0",
          paddingLeft: ".5rem",
        },
      },
    },
    legalLink: {
      color: palette.secondary.dark,
      fontWeight: 400,
    },
    ptLogo: {
      maxWidth: "14.75rem",
      marginBottom: "1rem",
      [breakpoints.up("md")]: {
        marginBottom: "0rem",
      },
    },
    links: {},
    link: {
      ...typography.h6,
      color: palette.secondary.dark,
    },
  })
);

export default useStyles;
