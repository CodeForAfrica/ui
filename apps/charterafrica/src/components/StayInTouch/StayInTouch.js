import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, SvgIcon } from "@mui/material";
import React from "react";

import FacebookIcon from "@/charterafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GithubIcon from "@/charterafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/charterafrica/assets/icons/Type=instagram, Size=24, Color=white.svg";
import LinkedInIcon from "@/charterafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/charterafrica/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/charterafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";

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
    <Grid
      container
      alignItems="center"
      columnSpacing={{ xs: 2, md: 4 }}
      rowSpacing={2}
      ref={ref}
    >
      <Grid item xs="auto">
        <RichTypography
          fontWeight="bold"
          textAlign={{ xs: "center", md: "left" }}
          textTransform="uppercase"
          variant="footer"
        >
          {title}
        </RichTypography>
      </Grid>
      <Grid
        item
        xs="auto"
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
