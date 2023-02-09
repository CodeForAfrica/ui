import React from "react";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  return (
    <div ref={ref}>
      <h1>OpportunityCard</h1>
    </div>
  );
});

export default OpportunityCard;
