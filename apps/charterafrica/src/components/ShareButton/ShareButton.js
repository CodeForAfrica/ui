import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import FacebookIcon from "@/charterafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import LinkedinIcon from "@/charterafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/charterafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";

const ShareBarButton = forwardRef((props, ref) => {
  const { type } = props;
  switch (type) {
    case "facebook":
      return (
        <FacebookShareButton {...props} ref={ref}>
          <SvgIcon sx={{ fill: "none" }} component={FacebookIcon} />
        </FacebookShareButton>
      );
    case "linkedin":
      return (
        <LinkedinShareButton {...props} ref={ref}>
          <SvgIcon sx={{ fill: "none" }} component={LinkedinIcon} />
        </LinkedinShareButton>
      );
    case "twitter":
      return (
        <TwitterShareButton {...props} ref={ref}>
          <SvgIcon sx={{ fill: "none" }} component={TwitterIcon} />
        </TwitterShareButton>
      );
    default:
      return null;
  }
});

ShareBarButton.propTypes = {
  type: PropTypes.oneOf(["linkedin", "facebook", "twitter"]).isRequired,
};

export default ShareBarButton;
