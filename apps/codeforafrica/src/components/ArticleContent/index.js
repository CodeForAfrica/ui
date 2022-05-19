import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

const ArticleContent = React.forwardRef(function ArticleGrid(props, ref) {
  const { ...other } = props;

  return (
    <Section sx={{ px: { xs: "20px", sm: 0 } }} {...other} ref={ref}>
      <RichTypography>Content section is here</RichTypography>
    </Section>
  );
});

export default ArticleContent;
