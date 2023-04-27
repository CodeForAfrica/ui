import React from "react";

import DigitalDemocracyList from "@/charterafrica/components/DigitalDemocracyList";
import OrganisationCard from "@/charterafrica/components/OrganisationCard";

const Tools = React.forwardRef(function Tools(props, ref) {
  return (
    <DigitalDemocracyList ref={ref} Component={OrganisationCard} {...props} />
  );
});

export default Tools;
