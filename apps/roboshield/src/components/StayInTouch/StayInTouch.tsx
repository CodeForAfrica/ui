import { Link, RichTypography } from "@commons-ui/next";
import { Grid, SvgIcon } from "@mui/material";
import React from "react";

import SocialMediaLinkIcon from "@/roboshield/components/SocialMediaLinkIcon";
import type { SocialMediaLink } from "@/roboshield/components/SocialMediaLinkIcon";

interface StayInTouchProps {
  links: SocialMediaLink[];
  sx: any;
  title: string;
}

const StayInTouch = React.forwardRef(function StayInTouch(
  { links, sx, title }: StayInTouchProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  if (!links?.length) {
    return null;
  }
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={{ xs: "center", md: "flex-start" }}
      sx={{
        ...sx,
      }}
      ref={ref}
    >
      <Grid item xs={12} md="auto">
        <RichTypography
          sx={{
            mb: { xs: 2.5, md: 0 },
            mr: { md: 4 },
            textAlign: { xs: "center", md: "left" },
          }}
          variant="footerCap"
        >
          {title}
        </RichTypography>
      </Grid>
      <Grid
        item
        xs={12}
        md="auto"
        container
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {links.map(({ url, platform }) => {
          return (
            <Grid
              item
              key={url}
              sx={{
                pr: "10px",
                ":last-of-type": {
                  pr: 0,
                },
              }}
            >
              <SocialMediaLinkIcon
                color="inherit"
                url={url}
                platform={platform}
                IconProps={{
                  fontSize: "inherit",
                  sx: {
                    fill: { xs: "none" },
                  },
                }}
                sx={{
                  display: "block",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
});

export default StayInTouch;
