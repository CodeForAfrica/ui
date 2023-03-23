import { RichTypography } from "@commons-ui/core";
import { Card, CardMedia, CardActionArea, Grid, styled } from "@mui/material";
import React from "react";

const Span = styled("span")(({ theme }) => ({
  margin: theme.spacing(0, 1),
  fontSize: "1rem",
  fontWeight: "bold",
}));

const DocumentCard = React.forwardRef(function DocumentCard(props, ref) {
  const {
    title,
    pages,
    created_at: publishDated,
    image,
    contributor,
    sx,
  } = props;

  return (
    <Card
      ref={ref}
      sx={{
        my: 2,
        border: "none",
        ...sx,
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          sx={{
            width: "100px",
            height: "140px",
          }}
        />
        <Grid
          container
          justifyContent="space-between"
          sx={{
            ml: 5,
          }}
        >
          <Grid item xs={12}>
            <RichTypography color="neutral.dark" variant="h2SemiBold">
              {title}
            </RichTypography>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              mt: 2,
            }}
          >
            <RichTypography color="black" variant="subheading">
              {pages} Pages
            </RichTypography>
            <Span>.</Span>
            <RichTypography color="black" variant="subheading">
              Contributed by: {contributor}
            </RichTypography>
          </Grid>
          <Grid item xs={12}>
            <RichTypography
              color="black"
              variant="subheading"
              sx={{
                my: 2,
              }}
            >
              {new Date(publishDated).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </RichTypography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
});

export default DocumentCard;
