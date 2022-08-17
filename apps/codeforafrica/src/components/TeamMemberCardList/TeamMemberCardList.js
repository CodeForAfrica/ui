import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";

import TeamMemberCard from "@/codeforafrica/components/TeamMemberCard";

const TeamMemberCardList = React.forwardRef(function TeamMemberCardList(
  props,
  ref
) {
  const { team, slug, sx, ...other } = props;

  if (!team?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        mr: { xs: -3, sm: 0 },
        ...sx,
      }}
      {...other}
      ref={ref}
    >
      <Grid
        container
        rowSpacing={{ xs: 3, sm: 2.5, md: 5, lg: "36px" }}
        columnSpacing={{ xs: 3, md: "25.6px", lg: 6 }}
        alignItems="stretch"
        flexWrap={{ xs: "nowrap", sm: "wrap" }}
        sx={{
          pr: { xs: 3, sm: 0 },
          overflowX: "scroll",
          // scrollbar
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer 10+
          /* Chrome, Webkit, etc. */
          "&::-webkit-scrollbar": {
            height: 0,
            width: 0,
          },
        }}
      >
        {team?.map((member) => (
          <Grid item key={member.href}>
            <TeamMemberCard {...member} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default TeamMemberCardList;
