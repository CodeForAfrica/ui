import { ShareButton } from "@hurumap/core";
import { Grid, TextField, Typography, SvgIcon, useTheme } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import useStyles from "./useStyles";

import { ReactComponent as EmailIcon } from "@/climatemappedafrica/assets/icons/Email.svg";
import { ReactComponent as FacebookIcon } from "@/climatemappedafrica/assets/icons/Facebook.svg";
import { ReactComponent as CopyIcon } from "@/climatemappedafrica/assets/icons/Group 5062.svg";
import { ReactComponent as LinkedInIcon } from "@/climatemappedafrica/assets/icons/LinkedIn.svg";
import { ReactComponent as TwitterIcon } from "@/climatemappedafrica/assets/icons/Twitter.svg";
import { ReactComponent as WhatsAppIcon } from "@/climatemappedafrica/assets/icons/WhatsApp.svg";
import site from "@/climatemappedafrica/utils/site";

function Share({
  title,
  chartType,
  geoCode,
  indicatorId,
  isCompare,
  ...props
}) {
  const classes = useStyles(props);
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleOnCopy = () => {
    setCopied((prev) => !prev);
  };

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => timer && clearTimeout(timer);
  }, [copied]);

  // Embed url
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
    { name: "CopyUrl" },
  ];

  const className = `wrapper-${geoCode}-${indicatorId}`;

  const code = `<div>
  <style>
    .frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
      z-index: 10;
    }
    .${className} {
        position: relative;
        overflow: hidden;
        padding-top: ${chartType === "treemap" ? "75%" : "56.25%"};
    }
    ${
      isCompare
        ? `@media (max-width: 1280px) {
      .${className} {
        padding-top: 160%;
      }
      @media (max-width: 620px) {
        .${className}  {
          padding-top: 200%;
        }
      @media (max-width: 500px) {
        .${className}  {padding-top: 240% }}`
        : `@media (max-width: 1280px) {
        .${className}{
          padding-top: ${chartType === "treemap" ? "100%" : "75%"};
        }
    @media (max-width: 620px) {
      .${className} {
        padding-top: ${chartType === "treemap" ? "120%" : "100%"};
      }
      @media (max-width: 500px) {
        .${className} {
          padding-top: ${chartType === "treemap" ? "170%" : "140%"};
        }
      }`
    }
</style>
<div class="${className}"><iframe class="frame"
  src="${
    process.env.NEXT_PUBLIC_APP_URL
  }/embed/${geoCode.toLowerCase()}/${indicatorId}"></iframe></div></div>
  `;

  return (
    <Grid container className={classes.root}>
      {shareData.map((social) => (
        <Grid item xs={4} key={social.name}>
          {social.name === "CopyUrl" ? (
            <div className={classes.shareButton}>
              <CopyToClipboard text={url} onCopy={handleOnCopy}>
                <SvgIcon
                  component={CopyIcon}
                  viewBox="0 0 28 28"
                  className={classes.copyIcon}
                />
              </CopyToClipboard>
            </div>
          ) : (
            <ShareButton
              name={social.name}
              icon={social.icon}
              url={url}
              {...social.props}
              sx={{
                backgroundColor: `${theme.palette.background.default} !important`,
                filter: "opacity(0.6)",
                width: "100%",
                border: `solid 1px ${theme.palette.background.paper} !important`,
                paddingTop: `${theme.typography.pxToRem(5)} !important`,
                "&:hover": {
                  border: "solid 1px #666666 !important",
                  backgroundColor: `${theme.palette.grey.light} !important`,
                },
              }}
              ButtonProps={{
                style: {
                  width: "100%",
                },
              }}
            />
          )}
        </Grid>
      ))}

      {copied ? (
        <Grid item xs={12} className={clsx(classes.row, classes.layout)}>
          <Typography className={classes.text}>Copied!</Typography>
        </Grid>
      ) : null}

      <Grid item xs={12} className={clsx(classes.row, classes.layout)}>
        <Typography className={classes.text}>Embed on your website:</Typography>
      </Grid>
      <Grid item xs={12} className={clsx(classes.row, classes.layout)}>
        <TextField
          value={code}
          InputProps={{ classes: { input: clsx(classes.code, classes.text) } }}
        />
      </Grid>
    </Grid>
  );
}

Share.propTypes = {
  title: PropTypes.string,
  chartType: PropTypes.string,
  geoCode: PropTypes.string,
  indicatorId: PropTypes.number,
  isCompare: PropTypes.bool,
};

Share.defaultProps = {
  title: undefined,
  geoCode: undefined,
  indicatorId: undefined,
  isCompare: undefined,
  chartType: undefined,
};

export default Share;
