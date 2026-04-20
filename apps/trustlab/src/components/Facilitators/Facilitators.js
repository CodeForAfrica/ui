import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { forwardRef } from "react";

const Facilitators = forwardRef((props, ref) => {
  const { content, facilitators } = props;

  if (!(content && facilitators?.length)) {
    return null;
  }
  // TODO(kilemensi): Why is the title and content combined? It's very hard to
  //                  align the content with the facilitators list.
  return (
    <Box sx={{ backgroundColor: "#F0F0F5" }} ref={ref}>
      <Section sx={{ py: 8, px: { xs: 2.5, sm: 0 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, sm: 5 }}>
            <LexicalRichText
              elements={content}
              sx={{
                h1: { mb: 1, fontWeight: 700 },
                h2: { mb: 1, fontWeight: 700 },
                h3: { mb: 1, fontWeight: 700 },
                p: { mb: 2 },
              }}
              TypographyProps={{
                variant: "p2",
                gutterBottom: true,
                sx: { mb: 1 },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Box
              component="ul"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                p: 0,
              }}
            >
              {facilitators.map((facilitator) => (
                <Box
                  component="li"
                  key={facilitator.id ?? facilitator.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#D9D9D9",
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="p2">{facilitator.name}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Facilitators;
