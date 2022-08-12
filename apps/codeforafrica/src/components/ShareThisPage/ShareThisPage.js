import React from "react";

import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareButtons";
import SocialMediaBar from "@/codeforafrica/components/SocialMediaBar";

const ShareThisPage = React.forwardRef(function ShareThisPage(props, ref) {
  const { children, sx, title, ...other } = props;
  return (
    <SocialMediaBar title={title} ref={ref} other={other} sx={sx}>
      <TwitterShareBarButton />
      <LinkedinShareBarButton />
      <FacebookShareBarButton />
    </SocialMediaBar>
  );
});

export default ShareThisPage;
