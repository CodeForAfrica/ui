import React from "react";

import SocialMediaBar from "@/civicsignalblog/components/SocialMediaBar";
import SocialMediaButton from "@/civicsignalblog/components/SocialMediaButton";

const ConnectBar = React.forwardRef(function ConnectBar(props, ref) {
  const { sx, title, links } = props;

  if (!links?.length) {
    return null;
  }

  const socialConnections = links.map(({ platform, url }) => ({
    name: platform?.toLowerCase(),
    url,
  }));

  return (
    <SocialMediaBar
      title={title}
      ref={ref}
      sx={{
        color: "text.primary",
        ...sx,
      }}
    >
      {socialConnections.map((connection) => (
        <SocialMediaButton {...connection} key={connection.name} />
      ))}
    </SocialMediaBar>
  );
});

export default ConnectBar;
