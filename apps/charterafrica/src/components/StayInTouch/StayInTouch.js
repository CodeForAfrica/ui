import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
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
    <Box ref={ref} alignItems="center" sx={{ marginTop: 2 }} display="flex">
      <RichTypography sx={{ textTransform: "uppercase" }} variant="p2SemiBold">
        {title}
      </RichTypography>
      <Box sx={{ marginLeft: 2 }} display="flex">
        {twitter && (
          <Link href={twitter}>
            <SvgIcon
              component={TwitterIcon}
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                marginLeft: "20px",
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
      </Box>
    </Box>
  );
}

export default forwardRef(StayInTouch);
