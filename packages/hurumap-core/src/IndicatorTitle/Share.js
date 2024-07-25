import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Grid, TextField, Typography, SvgIcon, Box } from "@mui/material";
// import clsx from "clsx";
// import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ShareButton from "./ShareButton";
// import useStyles from "./useStyles";

// import { ReactComponent as CopyIcon } from "@/pesayetu/assets/icons/Group 5062.svg";
// import site from "@/pesayetu/utils/site";

function Share({
  title,
  chartType,
  geoCode,
  indicatorId,
  isCompare,
  ...props
}) {
  // const classes = useStyles(props);
  const [copied, setCopied] = useState(false);

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
    process.env.NEXT_PUBLIC_APP_URL,
  ).toString();

  const shareData = [
    { name: "Facebook", props: { quote: title, hashtag: "#PesaYetu" } },
    {
      name: "Twitter",
      props: { title, via: "Code4Africa", related: ["Code4Africa"] },
    },
    {
      name: "LinkedIn",
      props: {
        summary: title,
        source: process.env.NEXT_PUBLIC_APP_URL,
      },
    },
    { name: "WhatsApp", props: { quote: title } },
    { name: "Email", props: { subject: title } },
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
    <Grid
      container
      {...props}
      // className={classes.root}
    >
      {shareData.map((social) => (
        <Grid item xs={4} key={social.name}>
          {social.name === "CopyUrl" ? (
            <Box
              // className={classes.shareButton}
              sx={(theme) => ({
                backgroundColor: `${theme.palette.background.default} !important`,
                filter: "opacity(0.6)",
                width: "100%",
                border: `solid 1px ${theme.palette.background.paper} !important`,
                paddingTop: `${theme.typography.pxToRem(5)} !important`,
                "&:hover": {
                  border: "solid 1px #666666 !important",
                  backgroundColor: `${theme.palette.grey.light} !important`,
                },
              })}
            >
              <CopyToClipboard text={url} onCopy={handleOnCopy}>
                <SvgIcon
                  component={ContentCopyIcon}
                  viewBox="0 0 28 28"
                  // className={classes.copyIcon}
                  sx={(theme) => ({
                    marginLeft: theme.typography.pxToRem(16),
                  })}
                />
              </CopyToClipboard>
            </Box>
          ) : (
            <ShareButton name={social.name} url={url} {...social.props} />
          )}
        </Grid>
      ))}

      {copied ? (
        <Grid
          item
          xs={12}
          // className={clsx(classes.row, classes.layout)}
          sx={(theme) => ({
            height: theme.typography.pxToRem(36),
            display: "flex",
            alignItems: "center",
            paddingLeft: theme.typography.pxToRem(16),
            border: `1px solid ${theme.palette.grey.light}`,
          })}
        >
          <Typography
            // className={classes.text}
            sx={(theme) => ({
              fontSize: theme.typography.pxToRem(11),
              lineHeight: 17 / 11,
              color: "#666666",
            })}
          >
            Copied!
          </Typography>
        </Grid>
      ) : null}

      <Grid
        item
        xs={12}
        // className={clsx(classes.row, classes.layout)}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.typography.pxToRem(16),
          border: `1px solid ${theme.palette.grey.light}`,
        })}
      >
        <Typography
          // className={classes.text}
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(11),
            lineHeight: 17 / 11,
            color: "#666666",
          })}
        >
          Embed on your website:
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        // className={clsx(classes.row, classes.layout)}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.typography.pxToRem(16),
          border: `1px solid ${theme.palette.grey.light}`,
        })}
      >
        <TextField
          value={code}
          // InputProps={{
          //   classes: { input: clsx(classes.code, classes.text) }
          //  }}
          sx={(theme) => ({
            "& .MuiInputBase-input": {
              background: theme.palette.background.paper,
              fontSize: theme.typography.pxToRem(11),
              lineHeight: 17 / 11,
              color: "#666666",
            },
          })}
        />
      </Grid>
    </Grid>
  );
}

export default Share;
