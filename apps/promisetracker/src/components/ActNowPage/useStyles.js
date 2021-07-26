import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  ({ breakpoints, palette, typography, widths }) => ({
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
    actNow: {},
    content: {},
    contentSection: {
      padding: `${typography.pxToRem(64)} 0 ${typography.pxToRem(96)} 0`,
      backgroundColor: palette.background.default,
      [breakpoints.up("lg")]: {
        position: "relative",
      },
    },
    contentSectionGrid: {
      marginTop: 0,
      paddingBottom: 0,
    },
    contentSectionAsideBackground: {
      display: "none",
      [breakpoints.up("lg")]: {
        display: "flex",
        height: typography.pxToRem(550),
        margin: 0,
        opacity: 0.2,
        position: "relative",
        width: typography.pxToRem(526),
      },
    },
    contentSectionAsideBackgroundImage: {
      objectFit: "contain",
    },
    criteria: {},
    criteriaItems: {
      marginTop: typography.pxToRem(25),
    },
    description: {
      marginTop: typography.pxToRem(52),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(10),
      },
    },
    grid: {
      alignItems: "center",
      paddingBottom: typography.pxToRem(40),
    },
    gridAside: {
      order: 1,
      [breakpoints.up("lg")]: {
        order: 1,
      },
    },
    gridContent: {
      order: 0,
      [breakpoints.up("lg")]: {
        order: 0,
      },
    },
    featuredFigure: {
      height: typography.pxToRem(250),
      margin: 0,
      position: "relative",
      width: typography.pxToRem(314),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(350),
        width: typography.pxToRem(440),
      },
    },
    figure: {
      height: typography.pxToRem(272),
      margin: "0 auto",
      position: "relative",
      width: typography.pxToRem(342),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(231),
        margin: 0,
        width: typography.pxToRem(290),
      },
    },
    image: {
      objectFit: "contain",
    },
    footer: {
      [breakpoints.up("lg")]: {
        marginTop: 0,
      },
    },
    partner: {
      paddingTop: typography.pxToRem(76),
      "&:first-of-type": {
        paddingTop: 0,
      },
    },
    logoFigure: {
      height: typography.pxToRem(123.5),
      margin: "0 auto",
      position: "relative",
      width: typography.pxToRem(246.36),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(140.63),
        margin: 0,
        width: typography.pxToRem(277.74),
      },
    },
    logoFigureLoggedIn: {
      height: typography.pxToRem(47.34),
      margin: 0,
      position: "relative",
      width: typography.pxToRem(102.57),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(140.63),
        width: typography.pxToRem(277.74),
      },
    },
    authButton: {
      backgroundColor: palette.primary.dark,
      color: palette.common.white,
      marginTop: typography.pxToRem(20),
      minWidth: typography.pxToRem(74),
      "&:hover": {
        backgroundColor: palette.primary.dark,
      },
      [breakpoints.up("lg")]: {
        paddingBottom: typography.pxToRem(15),
        paddingTop: typography.pxToRem(14),
        minWidth: typography.pxToRem(158),
      },
    },
    authGoogle: {
      backgroundColor: palette.google.main,
      width: "100%",
      "&:hover": {
        backgroundColor: palette.google.main,
      },
    },
    accountButton: {
      backgroundColor: palette.background.default,
      color: palette.text.primary,
      fontSize: typography.pxToRem(8),
      lineHeight: 9 / 8,
      marginTop: 0,
      minWidth: typography.pxToRem(74),
      paddingBottom: typography.pxToRem(10),
      paddingTop: typography.pxToRem(8),
      "&:hover": {
        backgroundColor: palette.background.default,
      },
      [breakpoints.up("lg")]: {
        fontSize: typography.button.fontSize,
        lineHeight: typography.button.lineHeight,
        paddingBottom: typography.pxToRem(15),
        paddingTop: typography.pxToRem(14),
        minWidth: typography.pxToRem(158),
      },
    },
    accountEdit: {
      marginLeft: typography.pxToRem(10),
      [breakpoints.up("lg")]: {
        marginLeft: typography.pxToRem(40),
      },
    },
    accountLogout: {},
    actNowSummary: {
      paddingBottom: typography.pxToRem(43),
    },
    summaryDetails: {
      [breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

export default useStyles;
