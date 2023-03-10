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
  const { medium } = props;
  let Button;
  let Icon;
  switch (medium) {
    case "facebook":
      Button = FacebookShareButton;
      Icon = FacebookIcon;
      break;
    case "linkedin":
      Button = LinkedinShareButton;
      Icon = LinkedinIcon;
      break;
    case "twitter":
      Button = TwitterShareButton;
      Icon = TwitterIcon;
      break;
    default:
      break;
  }
  if (!(Button && Icon)) {
    return null;
  }
  return (
    <Button {...props} ref={ref}>
      <SvgIcon sx={{ fill: "none" }} component={Icon} />
    </Button>
  );
});

ShareBarButton.propTypes = {
  medium: PropTypes.oneOf(["linkedin", "facebook", "twitter"]).isRequired,
};

export default ShareBarButton;
