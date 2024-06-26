import { RichTypography } from "@commons-ui/core";
import { Card, CardMedia, CardActionArea, Grid, SvgIcon } from "@mui/material";
import Link from "next/link";
import React from "react";

import Separator from "./Separator";

import PinIcon from "@/charterafrica/assets/icons/Property 1=Pin, Property 2=24, Property 3=Black.svg";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import formatDateTime from "@/charterafrica/utils/formatDate";

const DocumentCard = React.forwardRef(function DocumentCard(props, ref) {
  const {
    contributor,
    createdAt: publishDated,
    image,
    pages,
    sx,
    title,
    href,
    pinned = false,
  } = props;

  return (
    <Card
      sx={{
        boxShadow: "none",
        my: 2,
        border: "none",
        ...sx,
      }}
      ref={ref}
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
        component={Link}
        href={href}
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
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            container
            justifyContent="space-between"
            sx={{
              ml: 5,
            }}
          >
            <Grid item xs={12}>
              <LineClampedRichTypography
                color="neutral.dark"
                typography={{
                  xs: "h6SmallSemiBold",
                  md: "h2SemiBold",
                }}
                lineClamp={{
                  xs: 2,
                  sm: 3,
                  md: 1,
                }}
              >
                {title}
              </LineClampedRichTypography>
            </Grid>
            <Grid
              container
              direction={{
                xs: "column",
                sm: "row",
              }}
              alignItems={{
                xs: "flex-start",
                sm: "center",
              }}
              justifyContent="flex-start"
              wrap="nowrap"
              sx={{
                mt: 2,
                gap: {
                  xs: 1,
                  sm: 0,
                },
              }}
            >
              <RichTypography
                color="black"
                typography={{
                  xs: "caption",
                  sm: "subheading",
                }}
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                {`${pages} Pages`}
              </RichTypography>
              <Separator
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              />
              <LineClampedRichTypography
                color="black"
                typography={{
                  xs: "caption",
                  sm: "subheading",
                }}
                lineClamp={{
                  xs: 3,
                  sm: 1,
                }}
              >
                {`Contributed by: ${contributor}`}
              </LineClampedRichTypography>
            </Grid>
            <Grid item xs={12}>
              <RichTypography
                color="black"
                typography={{ xs: "caption", sm: "subheading" }}
                sx={{
                  my: 2,
                }}
              >
                {formatDateTime(publishDated, { includeTime: false })}
              </RichTypography>
            </Grid>
          </Grid>
          <Grid>
            {pinned && (
              <SvgIcon
                component={PinIcon}
                sx={{
                  color: "inherit",
                  display: "inline-flex",
                  fill: "none",
                }}
              />
            )}
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
});

export default DocumentCard;
