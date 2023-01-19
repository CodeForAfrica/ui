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

function StayInTouch(props) {
  const { title, twitter, slack, linkedin, facebook, instagram, github } =
    props;
  return (
    <Box alignItems="flex-start" sx={{ marginTop: 2 }} display="flex">
      <RichTypography>{title || "STAY IN TOUCH"}</RichTypography>
      <Box sx={{ marginLeft: 2 }} display="flex">
        {twitter && (
          <Link href={twitter}>
            <SvgIcon
              component={TwitterIcon}
              viewBox="0 0 32 32"
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                fontSize: "32px",
              }}
            />
          </Link>
        )}
        {slack && (
          <Link href={slack}>
            <SvgIcon
              component={SlackIcon}
              viewBox="0 0 32 32"
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                fontSize: "32px",
              }}
            />
          </Link>
        )}
        {linkedin && (
          <Link href={linkedin}>
            <SvgIcon
              component={LinkedInIcon}
              viewBox="0 0 32 32"
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                fontSize: "32px",
              }}
            />
          </Link>
        )}
        {facebook && (
          <Link href={facebook}>
            <SvgIcon
              component={FacebookIcon}
              viewBox="0 0 32 32"
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                fontSize: "32px",
              }}
            />
          </Link>
        )}
        {instagram && (
          <Link href={instagram}>
            <SvgIcon
              component={InstagramIcon}
              viewBox="0 0 32 32"
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                fontSize: "32px",
              }}
            />
          </Link>
        )}
        {github && (
          <Link href={github}>
            <SvgIcon
              component={GithubIcon}
              viewBox="0 0 32 32"
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
                fontSize: "32px",
              }}
            />
          </Link>
        )}
      </Box>
    </Box>
  );
}

export default forwardRef(StayInTouch);
