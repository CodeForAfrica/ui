import { Grid } from "@mui/material";
import React from "react";

import OpportunityCard from "@/charterafrica/components/OpportunityCard";

const OpportunityCardListGrid = React.forwardRef(
  function OpportunityCardListGrid(props, ref) {
    const { items, config, showAll } = props;

    return (
      <Grid
        ref={ref}
        container
        spacing={5}
        wrap="wrap"
        sx={{
          // hide from 5th child
          "& > :nth-of-type(n+5)": {
            display: showAll ? "flex" : "none",
          },

          // hide from 4th child on only xs and md
          "& > :nth-of-type(4)": {
            display: {
              xs: showAll ? "flex" : "none",
              sm: "flex",
              md: showAll ? "flex" : "none",
              lg: "flex",
            },
          },
        }}
      >
        {items.map((item) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item.id}
              display="flex"
              justifyContent="center"
            >
              <OpportunityCard {...item} key={item.id} config={config} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
);

export default OpportunityCardListGrid;
