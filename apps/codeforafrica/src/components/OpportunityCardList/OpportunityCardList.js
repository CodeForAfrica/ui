import { Section } from "@commons-ui/core";
import React from "react";

import OpportunityCard from "@/codeforafrica/components/OpportunityCard";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
  props,
  ref
) {
  const { opportunities } = props;

  if (!opportunities?.length) {
    return null;
  }
  return (
    <Section ref={ref}>
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.name} {...opportunity} />
      ))}
    </Section>
  );
});

export default OpportunityCardList;
