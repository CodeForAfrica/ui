import { Section } from "@commons-ui/core";
import { Divider, Grid, Typography } from "@mui/material";

import Card from "@/trustlab/components/Card";
import HelplineCard from "@/trustlab/components/HelplineCard";

function RelationshipOverviewList({
  linkLabel,
  title: sectionTitle,
  relationship,
  blockType,
}) {
  const isHelplines = blockType === "helplines-overview-list";
  return (
    <Section sx={{ px: { xs: 2.5, sm: 0 }, py: 8 }}>
      <Typography variant="h1">{sectionTitle}</Typography>
      <Divider
        sx={{
          border: "1px solid",
          borderColor: "common.black",
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
          ({
            title,
            image,
            id,
            shortDescription,
            tags = [],
            description,
            slug,
          }) => {
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
                {isHelplines ? (
                  <HelplineCard
                    title={title}
                    media={image}
                    description={shortDescription}
                    link={`/resources/${slug}`}
                    linkLabel={linkLabel}
                  />
                ) : (
                  <Card
                    title={title}
                    media={image}
                    tag={tags[0]?.name}
                    description={description}
                    link={`/resources/${slug}`}
                    linkLabel={linkLabel}
                  />
                )}
              </Grid>
            );
          },
        )}
      </Grid>
    </Section>
  );
}

export default RelationshipOverviewList;
