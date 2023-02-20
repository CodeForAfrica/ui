import { Section } from "@commons-ui/core";
import { Typography, Box, Divider } from "@mui/material";
import React from "react";

import OpportunityCardList from "../OpportunityCardList";

import { secondary } from "@/charterafrica/colors";

const GrantsAndFellowshipsGrid = React.forwardRef(
  function GrantsAndFellowshipsGrid(props, ref) {
    const { items, title, sx } = props;

    if (!items?.length) {
      return null;
    }

    const itemsByStatus = items.reduce((acc, item) => {
      const { status } = item;
      acc[status] = acc[status] || [];
      acc[status].push(item);
      return acc;
    }, {});

    const itemsByStatusArray = Object.keys(itemsByStatus).map((key) => {
      return {
        title: `${key} calls`,
        items: itemsByStatus[key],
      };
    });

    return (
      <Box
        sx={{
          backgroundColor: secondary[50],
          ...sx,
        }}
        ref={ref}
      >
        <Section
          sx={{
            px: { xs: 2.5, sm: 0 },
            py: 5,
            // hide from 2nd onwards on mobile and tablet
            "& > *:nth-of-type(n+2)": {
              display: {
                xs: "none",
                md: "block",
              },
            },
          }}
        >
          <Typography
            color="neutral.dark"
            pb={5}
            textAlign={{
              xs: "center",
              sm: "left",
            }}
            variant="h3Small"
          >
            {title}
          </Typography>

          {itemsByStatusArray.map((item) => {
            return (
              <React.Fragment key={item.title}>
                <OpportunityCardList
                  items={item.items}
                  title={item.title}
                  key={item.title}
                />
                <Divider
                  sx={{
                    border: "1px solid",
                    borderColor: "neutral.light",
                    color: "neutral.light",
                    height: "0px",
                    my: 5,
                    width: "100%",
                  }}
                />
              </React.Fragment>
            );
          })}
        </Section>
      </Box>
    );
  }
);

export default GrantsAndFellowshipsGrid;
