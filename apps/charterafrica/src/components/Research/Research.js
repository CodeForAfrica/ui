import { Section } from "@commons-ui/core";
import { Box, Divider, Grid } from "@mui/material";
import { forwardRef } from "react";

import PostCard from "../Postcard";

import { secondary } from "@/charterafrica/colors";

const Research = forwardRef((props, ref) => {
  const { sx, research } = props;
  return (
    <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
      <Section sx={{ pl: { xs: 4, sm: 0 }, pr: { xs: 4, sm: 0 } }} ref={ref}>
        <Grid rowSpacing={4} columnSpacing={1} container>
          <Grid xs={12} item>
            <Divider sx={{ p: 4 }} />
          </Grid>
          {research.map((item) => (
            <Grid key={Math.random()} item xs={12} sm={6} md={4}>
              <PostCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

export default Research;
