import { Section } from "@commons-ui/core";
import { Grid2 as Grid, Box } from "@mui/material";
import { forwardRef } from "react";

import ReportCard from "@/trustlab/components/ReportCard";

const ReportsList = forwardRef(function ReportsList(props, ref) {
  const { reports = [], condensed, cardActionLabel, ...other } = props;
  if (!reports.length) {
    return null;
  }
  return (
    <Box sx={{ background: "#fff" }}>
      <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
        <Grid container spacing={3} ref={ref} {...other}>
          {reports.map((report, index) => (
            <Grid key={report.id ?? index} size={{ xs: 12, sm: 4 }}>
              <ReportCard
                condensed={condensed}
                actionLabel={cardActionLabel}
                {...report}
                sx={
                  condensed && {
                    background: index % 2 === 0 ? "#E7E9FF" : "#F0F0F5",
                  }
                }
              />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

export default ReportsList;
