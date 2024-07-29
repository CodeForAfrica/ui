import { RichTypography } from "@commons-ui/core";
import { Share } from "@hurumap/core";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import Action from "./Action";
import Download from "./Download";

import { ReactComponent as DownloadIcon } from "@/pesayetu/assets/icons/Component 1.svg";
import { ReactComponent as ShareIcon } from "@/pesayetu/assets/icons/Component 27.svg";
import { ReactComponent as InfoIcon } from "@/pesayetu/assets/icons/Component852.svg";
import { ReactComponent as EmailIcon } from "@/pesayetu/assets/icons/Email.svg";
import { ReactComponent as FacebookIcon } from "@/pesayetu/assets/icons/Facebook.svg";
import { ReactComponent as CopyIcon } from "@/pesayetu/assets/icons/Group 5062.svg";
import { ReactComponent as LinkedInIcon } from "@/pesayetu/assets/icons/LinkedIn.svg";
import { ReactComponent as TwitterIcon } from "@/pesayetu/assets/icons/Twitter.svg";
import { ReactComponent as WhatsAppIcon } from "@/pesayetu/assets/icons/WhatsApp.svg";
import site from "@/pesayetu/utils/site";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {
    paddingTop: typography.pxToRem(24),
    paddingBottom: typography.pxToRem(25),
  },
  description: {
    fontSize: typography.pxToRem(11),
    lineHeight: 17 / 11,
    color: "#666666",
    padding: `${typography.pxToRem(18)} ${typography.pxToRem(
      20,
    )} ${typography.pxToRem(31)} ${typography.pxToRem(16)}`,
    "& > p > span": {
      display: "inline-block",
    },
  },
  link: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
    lineHeight: 20 / 13,
    fontFamily: typography.body1.fontFamily,
  },
  action: {
    marginRight: typography.pxToRem(14),
    "&:last-of-type": {
      marginRight: 0,
    },
  },
  buttons: {
    justifyContent: "flex-start",
    marginTop: typography.pxToRem(20),
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("md")]: {
      justifyContent: "flex-end",
      margin: 0,
    },
  },
}));

function IndicatorTitle({
  children,
  description,
  disableToggle,
  title,
  view,
  ...props
}) {
  const classes = useStyles(props);

  const { geoCode, indicatorId } = props;

  const url = new URL(
    `/embed/${geoCode.toLowerCase()}/${indicatorId}`,
    site.environmentUrl,
  ).toString();

  const shareData = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      props: { quote: title, hashtag: "#ClimateMapped.Africa" },
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      props: { title, via: "Code4Africa", related: ["Code4Africa"] },
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      props: {
        summary: title,
        source: process.env.NEXT_PUBLIC_APP_URL,
      },
    },
    { name: "WhatsApp", icon: WhatsAppIcon, props: { quote: title } },
    { name: "Email", icon: EmailIcon, props: { subject: title } },
    { name: "CopyUrl", icon: CopyIcon, props: { subject: title } },
  ];

  const actions = [
    description && {
      id: "act-description",
      title: "Description",
      header: "Learn More",
      children: (
        <RichTypography className={classes.description}>
          {description}
        </RichTypography>
      ),
      icon: <InfoIcon />,
    },
    {
      id: "act-download",
      title: "Download",
      header: disableToggle ? "Download chart as" : "Chart value as:",
      children: (
        <Download
          {...props}
          title={title}
          disableToggle={disableToggle}
          height={view?.height()}
          data={[
            ...(view?.data("primary") ?? []),
            ...(view?.data("secondary") ?? []),
          ]}
        />
      ),
      icon: <DownloadIcon />,
    },
    {
      id: "act-share",
      title: "Share",
      header: "Share chart via:",
      children: (
        <Share title={title} shareData={shareData} url={url} {...props} />
      ),
      icon: <ShareIcon />,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={8}>
          <RichTypography variant="h6">{children || title}</RichTypography>
        </Grid>
        <Grid item xs={12} md={4} container className={classes.buttons}>
          {actions
            .filter((a) => a?.id)
            .map((act) => (
              <Grid item key={act.id} className={classes.action}>
                <Action {...act} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

IndicatorTitle.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  disableToggle: PropTypes.bool,
  title: PropTypes.string,
  view: PropTypes.shape({
    height: PropTypes.func,
    data: PropTypes.func,
  }),
};

IndicatorTitle.defaultProps = {
  children: undefined,
  description: undefined,
  disableToggle: false,
  title: undefined,
  view: undefined,
};

export default IndicatorTitle;
