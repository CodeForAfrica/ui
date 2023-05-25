import React from "react";

import EcosystemList from "@/charterafrica/components/EcosystemList";
import ToolCard from "@/charterafrica/components/ToolCard";

const Tools = React.forwardRef(function Tools(props, ref) {
  return <EcosystemList Component={ToolCard} {...props} ref={ref} />;
});

export default Tools;
