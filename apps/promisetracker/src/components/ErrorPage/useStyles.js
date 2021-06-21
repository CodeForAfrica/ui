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
    articles: {
      background: palette.background.default,
      padding: `${typography.pxToRem(24)} 0 ${typography.pxToRem(52)}`,
      [breakpoints.up("lg")]: {
        padding: `${typography.pxToRem(80)} 0`,
      },
    },
    description: {
      marginTop: typography.pxToRem(52),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(0),
      },
    },
    grid: {
      padding: `${typography.pxToRem(28)} 0 ${typography.pxToRem(45)}`,
      [breakpoints.up("lg")]: {
        padding: `${typography.pxToRem(88)} 0`,
      },
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
    figure: {
      display: "flex",
      height: typography.pxToRem(250),
      margin: `${typography.pxToRem(34)} auto 0 auto`,
      position: "relative",
      width: typography.pxToRem(314),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(350),
        margin: `${typography.pxToRem(28)} 0 0 0`,
        width: typography.pxToRem(440),
      },
    },
    image: {
      objectFit: "contain",
    },
    title: {
      marginTop: typography.pxToRem(38),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(60),
      },
    },
    latestArticlesTitle: {
      margin: 0,
      marginBottom: typography.pxToRem(24),
      [breakpoints.up("lg")]: {
        margin: 0,
      },
    },
  })
);

export default useStyles;
