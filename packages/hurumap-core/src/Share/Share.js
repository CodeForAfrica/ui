import { Grid, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";

import ShareButton from "@/hurumap/core/ShareButton";

const Share = React.forwardRef(function Share(
  {
    title,
    chartType,
    code,
    geoCode,
    indicatorId,
    isCompare,
    shareData,
    url,
    ...props
  },
  ref,
) {
  const theme = useTheme();
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

  return (
    <Grid container {...props} ref={ref}>
      {shareData.map((social) => (
        <Grid item xs={4} key={social.name}>
          <ShareButton
            name={social.name}
            url={url}
            icon={social.icon}
            {...social.props}
            sx={{
              backgroundColor: `${theme.palette.background.default} `,
              filter: "opacity(0.6)",
              width: "100%",
              border: `solid 1px ${theme.palette.background.paper} `,
              paddingTop: `${theme.typography.pxToRem(5)} `,
              "&:hover": {
                border: "solid 1px #666666 ",
                backgroundColor: `${theme.palette.grey.light} `,
              },
            }}
            ButtonProps={{
              style: {
                width: "100%",
              },
            }}
            onCopy={handleOnCopy}
          />
        </Grid>
      ))}
      {copied ? (
        <Grid
          item
          xs={12}
          sx={{
            height: theme.typography.pxToRem(36),
            display: "flex",
            alignItems: "center",
            paddingLeft: theme.typography.pxToRem(16),
            border: `1px solid ${theme.palette.grey.light}`,
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.pxToRem(11),
              lineHeight: 17 / 11,
              color: "#666666",
            }}
          >
            Copied!
          </Typography>
        </Grid>
      ) : null}
      <Grid
        item
        xs={12}
        sx={{
          height: theme.typography.pxToRem(36),
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.typography.pxToRem(16),
          border: `1px solid ${theme.palette.grey.light}`,
        }}
      >
        <Typography
          sx={{
            color: "#666666",
          }}
          variant="caption"
        >
          Embed on your website:
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          height: theme.typography.pxToRem(36),
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.typography.pxToRem(16),
          border: `1px solid ${theme.palette.grey.light}`,
        }}
      >
        <TextField
          value={code}
          size="small"
          fullWidth
          InputProps={{
            style: {
              background: theme.palette.background.paper,
              fontSize: theme.typography.pxToRem(11),
              lineHeight: 17 / 11,
              color: "#666666",
            },
          }}
        />
      </Grid>
    </Grid>
  );
});

export default Share;
