import { Section, RichTypography } from "@commons-ui/core";
import Box from "@mui/material/Box";
import React from "react";

import TeamMemberCardList from "@/codeforafrica/components/TeamMemberCardList";

const OurTeam = React.forwardRef(function OurTeam(props, ref) {
  const { id: idProp, sx, team, title } = props;

  if (!team?.length) {
    return null;
  }
  const id = idProp || "our-team";
  return (
    <Box
      id={id}
      sx={{
        bgcolor: "background.main",
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          maxWidth: { md: 1028, lg: 1144 },
          px: { xs: 2.5, sm: 0 },
          py: { xs: 2.5, md: "62px", lg: 10 },
        }}
      >
        <RichTypography variant="h5" sx={{ mb: 2.5, typography: { md: "h4" } }}>
          {title}
        </RichTypography>
        <TeamMemberCardList team={team} />
      </Section>
    </Box>
  );
});

export default OurTeam;
