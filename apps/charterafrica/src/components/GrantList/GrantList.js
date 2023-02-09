import React from "react";

import OpportunityCard from "../OpportunityCard";

const GrantsList = React.forwardRef(function GrantsList(props) {
  const { grants } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
      }}
    >
      {grants.slice(0, 4).map((grant) => {
        return <OpportunityCard opportunity={grant} key={grant.id} />;
      })}
    </div>
  );
});

export default GrantsList;
