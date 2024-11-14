import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  quickLinkRoot: {
    textAlign: "center",
    padding: `${typography.pxToRem(32)} 0 `,
    [breakpoints.up("lg")]: {
      textAlign: "inherit",
      padding: 0,
    },
  },
  quickList: {
    listStyle: "none",
    color: palette.text.secondary,
    padding: 0,
    letterspacing: typography.pxToRem(0.7),
    "& > li": {
      marginTop: typography.pxToRem(16),
    },
  },
  quickLink: {
    fontSize: typography.subtitle1.fontSize,
    color: palette.text.secondary,
    fontWeight: "normal",
    "&:hover": {
      color: palette.primary.light,
    },
  },
  quickLinksTitle: {
    color: palette.text.secondary,
    fontSize: typography.subtitle2.fontSize,
    fontWeight: "bold",
  },
  copyright: {
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      justifyContent: "flex-start",
    },
    "& > a": {
      marginTop: typography.pxToRem(3),
    },
  },
  copyrightText: {
    color: palette.text.secondary,
    order: 5,
    padding: `0 ${typography.pxToRem(5)} 0 0`,
    [breakpoints.up("lg")]: {
      padding: `0 ${typography.pxToRem(10)} 0 0`,
    },
  },
}));

export default useStyles;
