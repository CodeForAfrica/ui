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
        marginTop: typography.pxToRem(0),
      },
    },
    grid: {
      paddingBottom: typography.pxToRem(40),
    },
    gridAside: {},
    gridContent: {},
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
    featuredImage: {
      objectFit: "contain",
    },
    footer: {},
    partner: {
      paddingTop: typography.pxToRem(76),
      "&:first-of-type": {
        paddingTop: 0,
      },
    },
    partnerFigure: {
      height: typography.pxToRem(120),
      margin: 0,
      position: "relative",
      width: typography.pxToRem(260),
    },
    partnerLogo: {
      objectFit: "contain",
    },
    partnerName: {},
    partnerDescription: {
      marginTop: typography.pxToRem(36),
    },
  })
);

export default useStyles;
