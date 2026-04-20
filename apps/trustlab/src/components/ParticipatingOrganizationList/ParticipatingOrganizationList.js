import { forwardRef } from "react";

import CardList from "./CardList";
import ChipList from "./ChipList";

const ParticipatingOrganizationList = forwardRef(
  function ParticipatingOrganizationList({ variant = "chip", ...props }, ref) {
    if (variant === "card") {
      return <CardList ref={ref} {...props} />;
    }
    return <ChipList ref={ref} {...props} />;
  },
);

export default ParticipatingOrganizationList;
