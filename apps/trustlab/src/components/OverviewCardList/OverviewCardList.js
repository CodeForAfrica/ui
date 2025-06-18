import { Section } from "@commons-ui/core";
import { Box, Divider, Grid, Typography } from "@mui/material";

import Card from "@/trustlab/components/Card";
import HelplineCard from "@/trustlab/components/HelplineCard";
import SpotlightCard from "@/trustlab/components/SpotlightCard";

function OverviewCardList({
  linkLabel,
  title: sectionTitle,
  relationship,
  blockType,
}) {
  const isHelplines = blockType === "helplines-overview-list";
  const isSpotlight = blockType === "spotlight";
  let OverviewCard = isHelplines ? HelplineCard : Card;
  if (isSpotlight) {
    OverviewCard = SpotlightCard;
  }
  return (
    <Section
      sx={{
        maxWidth: { md: "100%", xs: "100%" },
        px: { xs: 2.5, sm: 0 },
        py: 8,
        backgroundColor: isSpotlight ? "common.black" : "common.white",
      }}
    >
      <Box
        sx={(theme) => ({
          margin: "0 auto",
          maxWidth: theme.contentWidths.values,
        })}
      >
        <Typography
          variant="h1"
          sx={{
            color: isSpotlight ? "common.white" : "common.black",
          }}
        >
          {sectionTitle}
        </Typography>
        <Divider
          sx={{
            border: "1px solid",
            borderColor: isSpotlight ? "common.white" : "common.black",
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
          {relationship.map(
            ({ title, image, id, excerpt, tags = [], link: { href } }) => {
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
                    tag={tags[0]?.name}
                    link={href}
                    linkLabel={linkLabel}
                  />
                </Grid>
              );
            },
          )}
        </Grid>
      </Box>
    </Section>
  );
}

export default OverviewCardList;
