import { Link, RichTypography } from "@commons-ui/next";
import { Grid, SvgIcon } from "@mui/material";
import React from "react";

import FacebookIcon from "@/roboshield/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GitHubIcon from "@/roboshield/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/roboshield/assets/icons/Type=instagram, Size=24, Color=CurrentColor.svg";
import LinkedInIcon from "@/roboshield/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/roboshield/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/roboshield/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";

const platformToIconMap = new Map<string, any>();
platformToIconMap.set("Facebook", FacebookIcon);
platformToIconMap.set("Twitter", TwitterIcon);
platformToIconMap.set("Instagram", InstagramIcon);
platformToIconMap.set("Linkedin", LinkedInIcon);
platformToIconMap.set("Github", GitHubIcon);
platformToIconMap.set("Slack", SlackIcon);

interface StayInTouchProps {
  links: { url: string; platform: string }[];
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
          const Icon = platformToIconMap.get(platform);

          if (!(Icon || url)) {
            return null;
          }
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
              <Link
                sx={{
                  display: "block",
                }}
                color="inherit"
                href={url}
              >
                <SvgIcon
                  component={Icon}
                  sx={{
                    fill: { xs: "none" },
                  }}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
});

export default StayInTouch;
