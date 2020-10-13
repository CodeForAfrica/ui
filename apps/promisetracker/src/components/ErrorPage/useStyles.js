import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  ({ breakpoints, palette, typography, widths }) => ({
    root: {
      backgroundColor: palette.secondary.light,
    },
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
    sectionTitle: {},
    articles: {
      background: palette.background.default,
    },
    description: {
      marginTop: typography.pxToRem(52),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(0),
      },
    },
    grid: {
      paddingBottom: typography.pxToRem(19),
    },
    gridAside: {
      order: 0,
      [breakpoints.up("lg")]: {
        order: 1,
      },
    },
    gridArticle: {
      marginTop: typography.pxToRem(20),
      [breakpoints.up("lg")]: {
        marginTop: 0,
      },
    },
    gridArticles: {
      paddingBottom: typography.pxToRem(19),
      paddingTop: typography.pxToRem(19),
      [breakpoints.up("lg")]: {
        paddingBottom: typography.pxToRem(51),
        paddingTop: typography.pxToRem(71),
      },
    },
    gridContent: {
      order: 1,
      [breakpoints.up("lg")]: {
        order: 0,
      },
    },
    image: {
      display: "flex",
      margin: `${typography.pxToRem(34)} auto 0 auto`,
      minWidth: typography.pxToRem(314),
      width: typography.pxToRem(314),
      [breakpoints.up("lg")]: {
        margin: `${typography.pxToRem(28)} 0 0 0`,
        maxWidth: typography.pxToRem(440),
        minWidth: typography.pxToRem(440),
      },
    },
    latestArticles: {
      marginTop: typography.pxToRem(34),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(60),
      },
    },
    title: {
      marginTop: typography.pxToRem(38),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(60),
      },
    },
  })
);

export default useStyles;
