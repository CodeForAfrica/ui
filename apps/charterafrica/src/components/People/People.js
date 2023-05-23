import React from "react";

import ContributorCard from "@/charterafrica/components/ContributorCard";
import EcosystemList from "@/charterafrica/components/EcosystemList";

const People = React.forwardRef(function Tools(props, ref) {
  return <EcosystemList ref={ref} Component={ContributorCard} {...props} />;
});

export default People;
