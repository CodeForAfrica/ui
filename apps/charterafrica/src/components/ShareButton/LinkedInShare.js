import { SvgIcon } from "@mui/material";
import { forwardRef } from "react";
import { LinkedinShareButton } from "react-share";

import LinkedinIcon from "@/charterafrica/assets/icons/Type=linkedin, Size=24, Color=Black.svg";

const LinkedinShareBarButton = forwardRef((props, ref) => {
  return (
    <LinkedinShareButton {...props} ref={ref}>
      <SvgIcon sx={{ fill: "none" }} component={LinkedinIcon} />
    </LinkedinShareButton>
  );
});

export default LinkedinShareBarButton;
