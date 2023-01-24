import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import React, { forwardRef } from "react";

import FacebookIcon from "@/charterafrica/assets/icons/facebook.svg";
import GithubIcon from "@/charterafrica/assets/icons/github.svg";
import InstagramIcon from "@/charterafrica/assets/icons/instagram.svg";
import LinkedInIcon from "@/charterafrica/assets/icons/linkedin.svg";
import SlackIcon from "@/charterafrica/assets/icons/slack.svg";
import TwitterIcon from "@/charterafrica/assets/icons/twitter.svg";

function StayInTouch(props, ref) {
  const { title, twitter, slack, linkedin, facebook, instagram, github } =
    props;
  return (
    <Grid container ref={ref} alignItems="center" display="flex" spacing={2}>
      <Grid item xs={12} sm={3}>
        <RichTypography
          sx={{
            textTransform: "uppercase",
            textAlign: { xs: "center", sm: "left" },
          }}
          variant="p2SemiBold"
        >
          {title}
        </RichTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        flex={1}
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        display="flex"
      >
        {twitter && (
          <Link href={twitter}>
            <SvgIcon
              component={TwitterIcon}
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
              }}
            />
          </Link>
        )}
        {slack && (
          <Link href={slack}>
            <SvgIcon
              component={SlackIcon}
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                marginLeft: "20px",
              }}
            />
          </Link>
        )}
        {linkedin && (
          <Link href={linkedin}>
            <SvgIcon
              component={LinkedInIcon}
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                marginLeft: "20px",
              }}
            />
          </Link>
        )}
        {facebook && (
          <Link href={facebook}>
            <SvgIcon
              component={FacebookIcon}
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                marginLeft: "20px",
              }}
            />
          </Link>
        )}
        {instagram && (
          <Link href={instagram}>
            <SvgIcon
              component={InstagramIcon}
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                marginLeft: "20px",
              }}
            />
          </Link>
        )}
        {github && (
          <Link href={github}>
            <SvgIcon
              component={GithubIcon}
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                marginLeft: "20px",
              }}
            />
          </Link>
        )}
      </Grid>
    </Grid>
  );
}

export default forwardRef(StayInTouch);
