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
        marginTop: typography.pxToRem(0),
        maxWidth: typography.pxToRem(526),
        minWidth: typography.pxToRem(526),
        opacity: 0.2,
        position: "absolute",
        right: 0,
        top: 0,
        width: typography.pxToRem(526),
      },
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
    featuredImage: {
      minWidth: typography.pxToRem(314),
      width: typography.pxToRem(314),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(0),
        maxWidth: typography.pxToRem(440),
        minWidth: typography.pxToRem(440),
        width: typography.pxToRem(440),
      },
    },
    footer: {},
    partner: {
      paddingTop: typography.pxToRem(76),
      "&:first-of-type": {
        paddingTop: 0,
      },
    },
    partnerLogo: {
      height: typography.pxToRem(72),
      minHeight: typography.pxToRem(72),
      maxHeight: typography.pxToRem(72),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(120),
        minHeight: typography.pxToRem(120),
        maxHeight: typography.pxToRem(120),
      },
    },
    partnerName: {
      marginTop: typography.pxToRem(18),
    },
    partnerDescription: {
      marginTop: typography.pxToRem(36),
    },
  })
);

export default useStyles;
