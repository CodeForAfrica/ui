import React from "react";

import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/charterafrica/components/ShareButton";
import SocialMediaBar from "@/charterafrica/components/SocialMediaBar";

const ShareThisPage = React.forwardRef(function ShareThisPage(props, ref) {
  const { children, sx, title, ...other } = props;
  return (
    <SocialMediaBar title={title} ref={ref} {...other} sx={sx}>
      <TwitterShareBarButton />
      <FacebookShareBarButton />
      <LinkedinShareBarButton />
    </SocialMediaBar>
  );
});

export default ShareThisPage;
