import React from "react";

import EcosystemList from "@/charterafrica/components/EcosystemList";
import OrganisationCard from "@/charterafrica/components/OrganisationCard";

const Tools = React.forwardRef(function Tools(props, ref) {
  return <EcosystemList ref={ref} Component={OrganisationCard} {...props} />;
});

export default Tools;
