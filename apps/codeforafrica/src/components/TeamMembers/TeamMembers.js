import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

import TeamMemberCardList from "@/codeforafrica/components/TeamMemberCardList";

const TeamMembers = React.forwardRef(function TeamMembers(props, ref) {
  const { sx, team, title } = props;

  if (!team?.length) {
    return null;
  }
  return (
    <Section sx={sx} ref={ref}>
      <RichTypography
        variant="h5Small"
        sx={{ mb: 2.5, typography: { md: "h5" } }}
      >
        {title}
      </RichTypography>
      <TeamMemberCardList team={team} />
    </Section>
  );
});

export default TeamMembers;
