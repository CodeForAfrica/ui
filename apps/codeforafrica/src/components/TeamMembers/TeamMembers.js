import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

import TeamMemberCardList from "@/codeforafrica/components/TeamMemberCardList";

const TeamMembers = React.forwardRef(function TeamMembers(props, ref) {
  const { slug, team, title, ...other } = props;

  if (!team?.length) {
    return null;
  }
  return (
    <Section {...other} ref={ref}>
      <RichTypography variant="h5" sx={{ mb: 2.5 }}>
        {title}
      </RichTypography>
      <TeamMemberCardList team={team} />
    </Section>
  );
});

export default TeamMembers;
