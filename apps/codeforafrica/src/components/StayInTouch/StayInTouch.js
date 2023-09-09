import { Link, RichTypography } from "@commons-ui/next";
import { Grid, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import FacebookIcon from "@/codeforafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GitHubIcon from "@/codeforafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/codeforafrica/assets/icons/Type=instagram, Size=24, Color=CurrentColor.svg";
import LinkedInIcon from "@/codeforafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/codeforafrica/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";

const platformToIconMap = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedInIcon,
  Github: GitHubIcon,
  Slack: SlackIcon,
};

const StayInTouch = React.forwardRef(function StayInTouch(
  { links, sx, title },
  ref,
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
          const Icon = platformToIconMap[platform];

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

StayInTouch.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
    }),
  ),
  title: PropTypes.string,
};

StayInTouch.defaultProps = {
  links: undefined,
  title: undefined,
};

export default StayInTouch;
