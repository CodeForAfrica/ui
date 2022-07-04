import Grid from "@mui/material/Grid";
import React from "react";

import TeamMemberCard from "@/codeforafrica/components/TeamMemberCard";

const TeamMemberCardList = React.forwardRef(function TeamMemberCardList(
  props,
  ref
) {
  const { team, slug, ...other } = props;

  if (!team?.length) {
    return null;
  }
  return (
    <Grid
      container
      rowSpacing={{ xs: 3, sm: 2.5, md: 5, lg: "36px" }}
      columnSpacing={{ xs: 3, sm: "31px", md: "25.6px", lg: 6 }}
      flexWrap={{ xs: "nowrap", sm: "wrap" }}
      {...other}
      sx={{
        overflowX: "scroll",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer 10+
        /* Chrome, Webkit, etc. */
        "&::-webkit-scrollbar": {
          height: 0,
          width: 0,
        },
      }}
      ref={ref}
    >
      {team?.map((member) => (
        <Grid item key={member.href}>
          <TeamMemberCard {...member} />
        </Grid>
      ))}
    </Grid>
  );
});

export default TeamMemberCardList;
