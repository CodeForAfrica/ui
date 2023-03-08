import { SvgIcon } from "@mui/material";
import { forwardRef } from "react";
import { FacebookShareButton } from "react-share";

import FacebookIcon from "@/charterafrica/assets/icons/Type=facebook, Size=24, Color=Black.svg";

const FacebookBarButton = forwardRef((props, ref) => {
  return (
    <FacebookShareButton {...props} ref={ref}>
      <SvgIcon sx={{ fill: "none" }} component={FacebookIcon} />
    </FacebookShareButton>
  );
});

export default FacebookBarButton;
