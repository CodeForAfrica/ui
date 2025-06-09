import { Section } from "@commons-ui/core";
import { Box, Divider, Grid, Typography } from "@mui/material";

import Card from "@/trustlab/components/Card";

function ResourcesOverViewList({ linkLabel, title: sectionTitle, resources }) {
  return (
    <Box sx={{}}>
      <Section>
        <Typography variant="h1">{sectionTitle}</Typography>
        <Divider
          sx={{
            border: "1px solid",
            borderColor: "common.black",
          }}
        />
        <Grid
          container
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          {resources.map(({ title, image, id, tags, description, slug }) => {
            return (
              <Grid item key={id}>
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
    </Box>
  );
}

export default ResourcesOverViewList;
