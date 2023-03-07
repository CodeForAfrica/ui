import { Section, RichTypography } from "@commons-ui/core";
import { Box, Divider } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import OpportunityCards from "@/charterafrica/components/OpportunityCards";
import OpportunityHeader from "@/charterafrica/components/OpportunityHeader";

const groupCollectionItems = (items) => {
  const itemsByStatus =
    items?.reduce((acc, item) => {
      // Events, Grants use status; Felloships use category
      const status = item.status || item.category;
      acc[status] = acc[status] || [];
      acc[status].push(item);
      return acc;
    }, {}) ?? {};

  return Object.keys(itemsByStatus).map((key) => ({
    title: key,
    items: itemsByStatus[key],
  }));
};

const OpportunityPage = React.forwardRef(function OpportunityPage(props, ref) {
  const { featured, items, title: header, sx } = props;

  if (!items?.length) {
    return null;
  }

  const itemsPerOpportunity = items.map(({ items: currentItems, ...other }) => {
    const itemsPerStatus = groupCollectionItems(currentItems);
    return { ...other, itemsPerStatus };
  });
  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        ...sx,
      }}
      ref={ref}
    >
      <OpportunityHeader title={header} />
      {itemsPerOpportunity.map(({ config, itemsPerStatus, label }) => (
        <Section
          sx={{
            px: { xs: 7.5, sm: 0 },
            py: 5,
            "&:last-child": {
              pb: 0,
            },
          }}
          key={label}
        >
          <RichTypography
            color="neutral.dark"
            pb={5}
            textAlign={{
              xs: "center",
              md: "left",
            }}
            variant="h3Small"
          >
            {label}
          </RichTypography>

          {itemsPerStatus.map((item) => (
            <React.Fragment key={item.title}>
              <OpportunityCards
                config={config}
                featured={featured}
                items={item.items}
                title={item.title}
                sx={{
                  display: {
                    xs: config?.showOnMobile?.includes(item.title)
                      ? "block"
                      : "none",
                    md: "block",
                  },
                }}
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
          ))}
        </Section>
      ))}
    </Box>
  );
});

export default OpportunityPage;
