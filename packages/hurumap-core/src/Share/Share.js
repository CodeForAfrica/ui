import { Grid, useTheme } from "@mui/material";
import React from "react";

import ShareButton from "@/hurumap/core/ShareButton";

const Share = React.forwardRef(function Share({
  title,
  chartType,
  geoCode,
  indicatorId,
  isCompare,
  shareData,
  url,
  handleOnCopy,
  ...props
}) {
  const theme = useTheme();

  return (
    <Grid container {...props}>
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
    </Grid>
  );
});

export default Share;
