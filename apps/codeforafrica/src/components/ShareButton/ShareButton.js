/* eslint-env browser */
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
} from "react-share";

import FacebookIcon from "@/codeforafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import LinkedinIcon from "@/codeforafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import TooltipButton from "@/codeforafrica/components/TooltipButton";

const NAMED_SHARE_BAR_BUTTONS = {
  Facebook: {
    component: FacebookShareButton,
    children: <SvgIcon sx={{ fill: "none" }} component={FacebookIcon} />,
  },
  Linkedin: {
    component: LinkedinShareButton,
    children: <SvgIcon sx={{ fill: "none" }} component={LinkedinIcon} />,
  },
  Twitter: {
    component: TwitterShareButton,
    children: <SvgIcon sx={{ fill: "none" }} component={TwitterIcon} />,
  },
};

const NamedShareBarButton = React.forwardRef(function FacebookShareBarButton(
  props,
  ref
) {
  const { name, tooltipProps: tooltipPropsProp, url, ...other } = props;
  let location;
  if (typeof window !== "undefined") {
    location = window.location;
  }
  const tooltipProps = { title: name, ...tooltipPropsProp };
  return (
    <TooltipButton
      tooltipProps={tooltipProps}
      url={url || location}
      {...other}
      {...NAMED_SHARE_BAR_BUTTONS[name]}
      ref={ref}
    />
  );
});

NamedShareBarButton.propTypes = {
  name: PropTypes.oneOf(["Facebook", "Linkedin", "Twitter"]).isRequired,
  tooltipProps: PropTypes.shape({}),
  url: PropTypes.string,
};

NamedShareBarButton.defaultProps = {
  tooltipProps: undefined,
  url: undefined,
};

const FacebookShareBarButton = React.forwardRef(function FacebookShareBarButton(
  props,
  ref
) {
  return <NamedShareBarButton {...props} name="Facebook" ref={ref} />;
});

const LinkedinShareBarButton = React.forwardRef(function LinkedinShareBarButton(
  props,
  ref
) {
  return <NamedShareBarButton {...props} name="Linkedin" ref={ref} />;
});

const TwitterShareBarButton = React.forwardRef(function TwitterShareBarButton(
  props,
  ref
) {
  return <NamedShareBarButton {...props} name="Twitter" ref={ref} />;
});

export {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
};
