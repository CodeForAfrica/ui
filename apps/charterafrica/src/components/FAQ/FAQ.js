import React from "react";

import { secondary } from "@/charterafrica/colors";
import GuidingPrinciples from "@/charterafrica/components/GuidingPrinciples";

// Just reuse GuidingPrinciples component
const FAQ = React.forwardRef(function FAQ(props, ref) {
  return (
    <GuidingPrinciples
      {...props}
      sx={{
        backgroundColor: secondary[100],
        ...props?.sx,
      }}
      ref={ref}
    />
  );
});

export default FAQ;
