import { Section } from "@commons-ui/core";
import { Grid2 as Grid, Typography, Stack, Box } from "@mui/material";
import React, { forwardRef } from "react";

import HelplineCard from "../HelplineCard";

import RowCard from "@/trustlab/components/RowCard";

const Helplines = forwardRef(function Helplines(
  { title, briefs = [], displayType },
  ref,
) {
  return (
    <Box bgcolor="common.white">
      <Section
        ref={ref}
        sx={{ background: "common.white", py: 4, px: { xs: 2.5, md: 0 } }}
      >
        {/* If displayType is list, render  RowCard instead of helplineCard and shouldnt be wrapped in Stack */}
        {displayType === "list" ? (
          <Box sx={{ py: 2 }}>
            <Typography sx={{ mb: 2 }} variant="subheading2">
              {title}
            </Typography>
            {briefs.map((brief) => (
              <RowCard
                key={brief.id}
                sx={{ mb: 3, borderTop: "1px solid", borderRadius: 0 }}
                {...brief}
                image={brief.icon}
              />
            ))}
          </Box>
        ) : (
          <Stack spacing={4}>
            <Typography variant="display4">{title}</Typography>
            <Grid
              container
              sx={{ ml: -2 }}
              spacing={{
                xs: 6,
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
        )}
      </Section>
    </Box>
  );
});

export default Helplines;
