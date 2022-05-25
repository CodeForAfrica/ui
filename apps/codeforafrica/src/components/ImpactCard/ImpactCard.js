import Card from "@mui/material/Card";

import { styled } from "@mui/material/styles";
import React from "react";

const ImpactCardRoot = styled(Card, {
  slot: "Root",
})(() => ({}));

const ImpactCard = React.forwardRef(function ImpactCard(ref) {
  return (
    <ImpactCardRoot>
      <div>content here</div>
    </ImpactCardRoot>
  );
});

export default ImpactCard;
