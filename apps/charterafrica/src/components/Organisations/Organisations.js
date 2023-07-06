import React from "react";

import EcosystemList from "@/charterafrica/components/EcosystemList";
import OrganisationCard from "@/charterafrica/components/OrganisationCard";

const Organisations = React.forwardRef(function Organisations(props, ref) {
  return <EcosystemList ref={ref} Component={OrganisationCard} {...props} />;
});

export default Organisations;
