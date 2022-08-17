import React from "react";

import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareButton";
import SocialMediaBar from "@/codeforafrica/components/SocialMediaBar";

const ShareThisPage = React.forwardRef(function ShareThisPage(props, ref) {
  const { children, sx, title, ...other } = props;
  return (
    <SocialMediaBar title={title} ref={ref} {...other} sx={sx}>
      <TwitterShareBarButton />
      <LinkedinShareBarButton />
      <FacebookShareBarButton />
    </SocialMediaBar>
  );
});

export default ShareThisPage;
