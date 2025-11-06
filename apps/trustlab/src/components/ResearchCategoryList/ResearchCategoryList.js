import { Section } from "@commons-ui/core";
import { Grid2 as Grid } from "@mui/material";
import { forwardRef } from "react";

import ResearchCategoryCard from "@/trustlab/components/ResearchCategoryCard";

const ResearchCategoryList = forwardRef(
  function ResearchCategoryList(props, ref) {
    const { categories = [], ...other } = props;

    if (!categories.length) {
      return null;
    }

    return (
      <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
        <Grid container spacing={3} ref={ref} {...other}>
          {categories.map((category, index) => (
            <Grid key={category.id ?? index} size={{ xs: 12, sm: 4 }}>
              <ResearchCategoryCard {...category} />
            </Grid>
          ))}
        </Grid>
      </Section>
    );
  },
);

export default ResearchCategoryList;
