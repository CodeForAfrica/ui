import React from "react";

import SocialMediaBar from "@/codeforafrica/components/SocialMediaBar";
import SocialMediaButton from "@/codeforafrica/components/SocialMediaButton";

const ConnectBar = React.forwardRef(function ConnectBar(props, ref) {
  const { sx, title, links, ...other } = props;

  return links ? (
    <SocialMediaBar title={title} ref={ref} other={other} sx={sx}>
      {Object.entries(links).map(([key, value]) => {
        return <SocialMediaButton key={key} name={key} url={value} />;
      })}
    </SocialMediaBar>
  ) : null;
});

export default ConnectBar;
