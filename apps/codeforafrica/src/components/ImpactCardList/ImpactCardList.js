import { Section } from "@commons-ui/core";
import React from "react";

import ImpactCard from "../ImpactCard/ImpactCard";

const ImpactCardList = React.forwardRef(function ImpactCardList(props, ref) {
  const { initiatives } = props;
  return (
    <Section
      sx={{
        backgroundColor: "background.main",
      }}
      ref={ref}
    >
      {initiatives?.map((initiative) => {
        return <ImpactCard key={initiative.title} initiative={initiative} />;
      })}
    </Section>
  );
});

export default ImpactCardList;
