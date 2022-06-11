import { RichTypography } from "@commons-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

const GuidingPrinciplesCard = React.forwardRef(function GuidingPrinciplesCard(
  props,
  ref
) {
  const { title } = props;
  return (
    <Card ref={ref}>
      <CardContent>
        <RichTypography>{title}</RichTypography>
        <RichTypography>Guiding Principles Card</RichTypography>
      </CardContent>
    </Card>
  );
});

export default GuidingPrinciplesCard;
