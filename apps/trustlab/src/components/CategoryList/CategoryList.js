import { Section } from "@commons-ui/core";
import { Grid2 as Grid } from "@mui/material";
import { forwardRef } from "react";

import CategoryCard from "@/trustlab/components/CategoryCard";

const CategoryList = forwardRef(function CategoryList(props, ref) {
  const { categories } = props;

  if (!categories.length) {
    return null;
  }
  return (
    <Section sx={{ py: 8, px: { xs: 2.5, sm: 0 } }}>
      <Grid container spacing={3} rowSpacing={{ xs: 5, sm: 3 }} ref={ref}>
        {categories.map((category, index) => (
          <Grid key={category.id ?? index} size={{ xs: 12, sm: 4 }}>
            <CategoryCard {...category} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
});

export default CategoryList;
