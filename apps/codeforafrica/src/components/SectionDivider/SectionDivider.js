import { Section } from "@commons-ui/core";
import { Divider } from "@mui/material";
import React from "react";

const SectionDivider = React.forwardRef(function SectionDivider(props, ref) {
  return (
    <Section {...props} ref={ref}>
      <Divider />
    </Section>
  );
});

export default SectionDivider;
