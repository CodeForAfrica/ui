import { Section } from "@commons-ui/core";
import { Grid2 as Grid, Typography, Stack, Box } from "@mui/material";
import React, { forwardRef } from "react";

import HelplineCard from "../HelplineCard";

const Helplines = forwardRef(function Helplines({ title, briefs = [] }, ref) {
  return (
    <Box bgcolor="common.white">
      <Section
        ref={ref}
        sx={{ background: "common.white", py: 4, px: { xs: 2.5, md: 0 } }}
      >
        <Stack spacing={4}>
          <Typography variant="display4">{title}</Typography>
          <Grid
            container
            sx={{ ml: -2 }}
            spacing={{
              xs: 2,
              md: 10,
            }}
          >
            {briefs.map((brief) => (
              <Grid key={brief.id} size={{ xs: 12, sm: 4 }}>
                <HelplineCard {...brief} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Section>
    </Box>
  );
});

export default Helplines;
