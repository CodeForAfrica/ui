import React from "react";

import ContributorCard from "@/charterafrica/components/ContributorCard";
import DigitalDemocracyList from "@/charterafrica/components/DigitalDemocracyList";

const People = React.forwardRef(function Tools(props, ref) {
  return (
    <DigitalDemocracyList ref={ref} Component={ContributorCard} {...props} />
  );
});

export default People;
