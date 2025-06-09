import { Section } from "@commons-ui/core";
import { Divider, Grid, Typography } from "@mui/material";

import Card from "@/trustlab/components/Card";

function ResourcesOverViewList({ linkLabel, title: sectionTitle, resources }) {
  return (
    <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
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
        {resources.map(({ title, image, id, tags, description, slug }) => {
          return (
            <Grid
              item
              key={id}
              sx={{
                flexGrow: 1,
              }}
            >
              <Card
                title={title}
                media={image}
                tag={tags[0]?.name}
                description={description}
                link={`/resources/${slug}`}
                linkLabel={linkLabel}
              />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
}

export default ResourcesOverViewList;
