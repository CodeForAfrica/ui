import { Section } from "@commons-ui/core";
import React from "react";

const ImpactCardList = React.forwardRef(function ImpactCardList(props, ref) {
  return (
    <Section
      sx={{
        backgroundColor: "background.main",
      }}
      ref={ref}
    >
      Impact Card List
    </Section>
  );
});

export default ImpactCardList;
