import React from "react";

import SocialMediaBar from "@/codeforafrica/components/SocialMediaBar";
import SocialMediaButton from "@/codeforafrica/components/SocialMediaButton";
import sortSocialmediaLinks from "@/codeforafrica/utils/sortSocialMediaLinks";

const ConnectBar = React.forwardRef(function ConnectBar(props, ref) {
  const { sx, title, links, ...other } = props;

  return links ? (
    <SocialMediaBar title={title} ref={ref} other={other} sx={sx}>
      {sortSocialmediaLinks(links).map((link) => {
        return (
          <SocialMediaButton key={link.type} name={link.type} url={link.link} />
        );
      })}
    </SocialMediaBar>
  ) : null;
});

export default ConnectBar;
