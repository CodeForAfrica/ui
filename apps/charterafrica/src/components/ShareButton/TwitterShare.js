import { SvgIcon } from "@mui/material";
import { forwardRef } from "react";
import { TwitterShareButton } from "react-share";

import TwitterIcon from "@/charterafrica/assets/icons/Type=twitter, Size=24, Color=Black.svg";

const TwitterShareBarButton = forwardRef((props, ref) => {
  return (
    <TwitterShareButton {...props} ref={ref}>
      <SvgIcon sx={{ fill: "none" }} component={TwitterIcon} />
    </TwitterShareButton>
  );
});

export default TwitterShareBarButton;
