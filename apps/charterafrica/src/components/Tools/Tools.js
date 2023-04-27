import React from "react";

import DigitalDemocracyList from "@/charterafrica/components/DigitalDemocracyList";
import ToolCard from "@/charterafrica/components/ToolCard";

const Tools = React.forwardRef(function Tools(props, ref) {
  return <DigitalDemocracyList ref={ref} Component={ToolCard} {...props} />;
});

export default Tools;
