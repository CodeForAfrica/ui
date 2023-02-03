import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActions,
} from "@mui/material";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";

const FeaturedPostCard = React.forwardRef(function FeaturedPostCard(
  props,
  ref
) {
  const { title, date, excerpt, image, sx, link } = props;

  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        display: { xs: "none", md: "block" },
        ...sx,
      }}
      ref={ref}
    >
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}>
        <Card
          sx={{
            display: "flex",
            boxShadow: "none",
            backgroundColor: secondary[50],
          }}
        >
          <CardMedia
            component="img"
            image={image.url}
            alt={image.alt}
            sx={{
              width: "820px",
              height: "487px",
              borderRadius: "5px",
              filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1))",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
          >
            <LineClampedRichTypography
              color={neutral[900]}
              html={false}
              textAlign="left"
              variant="h2SemiBold"
            >
              {title}
            </LineClampedRichTypography>
            <LineClampedRichTypography
              color={neutral[500]}
              html={false}
              textAlign="left"
              typography="p1"
            >
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </LineClampedRichTypography>

            <RichText
              elements={excerpt}
              color={neutral[900]}
              textAlign="left"
              variant="subheading"
            />
            <CardActions
              href={link?.href}
              component={link?.href ? Link : undefined}
            >
              <Typography
                color={neutral[900]}
                typography="p3"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Read More
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
      </Section>
    </Box>
  );
});

export default FeaturedPostCard;
