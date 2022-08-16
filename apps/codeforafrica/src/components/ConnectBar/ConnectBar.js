import React from "react";

import SocialMediaBar from "@/codeforafrica/components/SocialMediaBar";
import SocialMediaButton from "@/codeforafrica/components/SocialMediaButton";

const ConnectBar = React.forwardRef(function ConnectBar(props, ref) {
  const { sx, title, links } = props;

  if (!links || !Object.entries(links)?.length) {
    return null;
  }

  const socialConnections = [
    "twitter",
    "slack",
    "linkedin",
    "facebook",
    "instagram",
    "github",
  ].flatMap((name) => (links[name] ? [{ name, url: links[name] }] : []));

  return (
    <SocialMediaBar title={title} ref={ref} sx={sx}>
      {socialConnections.map((connection) => (
        <SocialMediaButton {...connection} key={connection.name} />
      ))}
    </SocialMediaBar>
  );
});

export default ConnectBar;
