import { Section } from "@commons-ui/core";
import { Typography, Box } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import FeaturedEventCard from "@/charterafrica/components/FeaturedEventCard/FeaturedEventCard";

const Events = React.forwardRef(function Events(props, ref) {
  const { items, title, sx } = props;

  const featuredEvent = items?.find((item) => item.featured);
  console.log("featuredEvent", featuredEvent);
  // const otherEvents = items?.splice(items.indexOf(featuredEvent), 1);

  if (!items?.length) {
    return null;
  }
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
            sm: "left",
          }}
          variant="h3Small"
        >
          {title}
        </Typography>

        {/* if featured event, show featured event card */}
        {featuredEvent ? <FeaturedEventCard {...featuredEvent} /> : null}

        {/* <FeaturedEventCard {...featuredEvent} /> */}

        {/* {itemsByStatusArray.map((item) => {
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
                  mb: 0,
                },
              }}
            />
          </React.Fragment>
        );
      })} */}
      </Section>
    </Box>
  );
});

export default Events;
