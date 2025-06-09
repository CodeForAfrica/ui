import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Divider,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
} from "@mui/material";

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
          sx={{
            gap: 3,
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          {resources.map(({ title, image, id, tags, description }) => {
            return (
              <Grid item key={id}>
                <Card
                  raised
                  sx={{
                    width: 380,
                    maxWidth: 380,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: 0,
                  }}
                >
                  <CardMedia
                    image={image.src}
                    title={title}
                    sx={{
                      height: 270,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "common.black",
                        opacity: 0.8,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        height: 70,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        pl: 2.5,
                      }}
                    >
                      <Typography
                        variant="button"
                        sx={{
                          color: "common.white",
                        }}
                      >
                        {tags[0]?.name}
                      </Typography>
                    </Box>
                  </CardMedia>
                  <CardHeader
                    title={<Typography variant="h2">{title}</Typography>}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <LexicalRichText
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        "-webkit-line-clamp": "3",
                        "-webkit-box-orient": "vertical",
                      }}
                      elements={description}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        width: "100%",
                      }}
                    >
                      {linkLabel}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Section>
    </Box>
  );
}

export default ResourcesOverViewList;
