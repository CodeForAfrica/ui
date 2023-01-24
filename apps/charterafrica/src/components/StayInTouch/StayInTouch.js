import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, SvgIcon } from "@mui/material";
import React from "react";

import FacebookIcon from "@/charterafrica/assets/icons/facebook.svg";
import GithubIcon from "@/charterafrica/assets/icons/github.svg";
import InstagramIcon from "@/charterafrica/assets/icons/instagram.svg";
import LinkedInIcon from "@/charterafrica/assets/icons/linkedin.svg";
import SlackIcon from "@/charterafrica/assets/icons/slack.svg";
import TwitterIcon from "@/charterafrica/assets/icons/twitter.svg";

const mediaToIcon = {
  facebook: FacebookIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  slack: SlackIcon,
  twitter: TwitterIcon,
};

const StayInTouch = React.forwardRef(function StayInTouch(props, ref) {
  const { title, links } = props;

  if (!links?.length) {
    return null;
  }
  return (
    <Grid container columnSpacing={4} rowSpacing={2} ref={ref}>
      <Grid item xs={12} md="auto">
        <RichTypography
          textAlign={{ xs: "center", md: "left" }}
          textTransform="uppercase"
          variant="p2SemiBold"
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
        columnSpacing={2}
      >
        {links?.map((link) => (
          <Grid item key={link.id}>
            <Link href={link.url}>
              <SvgIcon
                component={mediaToIcon[link.media]}
                sx={{
                  color: "text.secondary",
                  display: "inline-flex",
                  fill: "none",
                }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});

export default StayInTouch;
