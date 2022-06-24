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
    <Section sx={{ pb: 2.5, px: { xs: 2.5, sm: 0 } }} ref={ref}>
      {opportunities.map((opportunity) => (
        <OpportunityCard
          sx={{ mt: "80px" }}
          key={opportunity.href || opportunity.title}
          {...opportunity}
        />
      ))}
    </Section>
  );
});

export default OpportunityCardList;
