import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import { Chart, Key } from "@/charterafrica/components/Ecosystem";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const DatasetsCharts = React.forwardRef(function DatasetsCharts(props, ref) {
  const { sx, data } = props;

  return (
    <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: "50px" } }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
        >
          <Grid item xs={12} md={6}>
            <Chart data={data} />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box display="flex" gap={3.75} flexDirection="column">
              <LineClampedRichTypography
                color="neutral.dark"
                lineClamp={1}
                order={1}
                variant="h2Small"
                typography={{ md: "h2" }}
              >
                Database
              </LineClampedRichTypography>
              <Key data={data} order={{ xs: 2, md: 3 }} title="Key" />
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default DatasetsCharts;
