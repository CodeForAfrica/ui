/* eslint-env browser */
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
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

const ShareBarButton = React.forwardRef(function ShareBar(props, ref) {
  const { component, tooltip = true, tooltipProps, ...other } = props;
  const Component = component || IconButton;
  const shareBarButton = <Component {...other} ref={ref} />;
  if (!tooltip) {
    return shareBarButton;
  }
  return <Tooltip {...tooltipProps}>{shareBarButton}</Tooltip>;
});

ShareBarButton.propTypes = {
  tooltipProps: PropTypes.shape({}),
  tooltip: PropTypes.bool,
};

ShareBarButton.defaultProps = {
  tooltipProps: undefined,
  tooltip: undefined,
};

const NAMED_SHARE_BAR_BUTTONS = {
  Facebook: {
    component: FacebookShareButton,
    children: <SvgIcon component={FacebookIcon} />,
  },
  Linkedin: {
    component: LinkedinShareButton,
    children: <SvgIcon component={LinkedinIcon} />,
  },
  Twitter: {
    component: TwitterShareButton,
    children: <SvgIcon component={TwitterIcon} />,
  },
};

const NamedShareBarButton = React.forwardRef(function FacebookShareBarButton(
  props,
  ref
) {
  const {
    name,
    tooltipProps: tooltipPropsProp,
    url: urlProp,
    ...other
  } = props;
  let url = urlProp;
  if (typeof window !== "undefined") {
    url = window.location;
  }
  const tooltipProps = { title: name, ...tooltipPropsProp };
  return (
    <ShareBarButton
      tooltipProps={tooltipProps}
      url={url}
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

export default ShareBarButton;
