import { Section } from "@commons-ui/core";
import { Typography, Box, Divider } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import OpportunityCardList from "@/charterafrica/components/OpportunityCardList";

const EventsFellowshipsAndGrants = React.forwardRef(
  function EventsFellowshipsAndGrants(props, ref) {
    const { config, items, title, sx } = props;

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
        title: `${key}`,
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
            "&:last-child": {
              pb: 0,
            },
          }}
        >
          <Typography
            color="neutral.dark"
            pb={5}
            textAlign={{
              xs: "center",
              md: "left",
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
                  config={config}
                  sx={{
                    display: {
                      xs: config?.showOnMobile?.includes(item.title)
                        ? "block"
                        : "none",
                      md: "block",
                    },
                  }}
                />
                <Divider
                  sx={{
                    border: "1px solid",
                    borderColor: "neutral.light",
                    color: "neutral.light",
                    height: "0px",
                    my: 5,
                    width: "100%",
                    display: {
                      xs: config?.showOnMobile?.includes(item.title)
                        ? "block"
                        : "none",
                      md: "block",
                    },
                    "&:last-child": {
                      marginBottom: 0,
                    },
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

export default EventsFellowshipsAndGrants;
