import { RichTypography } from "@commons-ui/core";
import { Card, CardMedia, CardActionArea, Grid } from "@mui/material";
import React from "react";

import Separator from "./Separator";

const DocumentCard = React.forwardRef(function DocumentCard(props, ref) {
  const {
    contributor,
    created_at: publishDated,
    image,
    locale,
    pages,
    sx,
    title,
  } = props;

  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: "none",
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
          ".MuiCardActionArea-focusHighlight": {
            background: "transparent",
          },
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
            <RichTypography
              color="neutral.dark"
              typography={{
                xs: "h6SmallSemiBold",
                sm: "h2SemiBold",
              }}
            >
              {title}
            </RichTypography>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            wrap="nowrap"
            sx={{
              mt: 2,
            }}
          >
            <RichTypography
              color="black"
              typography={{
                xs: "caption",
                sm: "subheading",
              }}
            >
              {`${pages} Pages`}
            </RichTypography>
            <Separator />
            <RichTypography
              color="black"
              typography={{
                xs: "caption",
                sm: "subheading",
              }}
            >
              {`Contributed by: ${contributor}`}
            </RichTypography>
          </Grid>
          <Grid item xs={12}>
            <RichTypography
              color="black"
              typography={{ xs: "caption", sm: "subheading" }}
              sx={{
                my: 2,
              }}
            >
              {new Date(publishDated).toLocaleDateString(locale, {
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
