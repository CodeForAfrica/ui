import { Section } from "@commons-ui/core";
import { Box, Divider, Grid, Typography } from "@mui/material";

import Card from "@/trustlab/components/Card";
import HelplineCard from "@/trustlab/components/HelplineCard";
import SpotlightCard from "@/trustlab/components/SpotlightCard";

function OverviewCardList({
  linkLabel,
  title: sectionTitle,
  items,
  blockType,
}) {
  const isHelplines = blockType === "helplines-overview-list";
  const isSpotlight = blockType === "spotlight";
  let OverviewCard = isHelplines ? HelplineCard : Card;
  if (isSpotlight) {
    OverviewCard = SpotlightCard;
  }

  const foregroundColor = isSpotlight ? "common.white" : "common.black";
  const backgroundColor = isSpotlight ? "common.black" : "common.white";

  return (
    <Box
      sx={{
        backgroundColor,
        px: { xs: 2.5, sm: 0 },
        py: 8,
      }}
    >
      <Section>
        <Typography
          variant="h1"
          sx={{
            color: foregroundColor,
          }}
        >
          {sectionTitle}
        </Typography>
        <Divider
          sx={{
            border: "1px solid",
            borderColor: foregroundColor,
          }}
        />
        <Grid
          container
          sx={{
            gap: 1,
            justifyContent: {
              xs: "center",
              md: "space-between",
            },
            mt: 3,
          }}
        >
          {items.map(({ title, image, id, excerpt, tag, href }) => {
            return (
              <Grid
                item
                key={id}
                sx={{
                  flexGrow: {
                    xs: 1,
                    md: 0,
                  },
                }}
              >
                <OverviewCard
                  title={title}
                  media={image}
                  description={excerpt}
                  tag={tag}
                  link={href}
                  linkLabel={linkLabel}
                />
              </Grid>
            );
          })}
        </Grid>
      </Section>
    </Box>
  );
}

export default OverviewCardList;
