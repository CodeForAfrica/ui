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

const FeaturedPostCard = React.forwardRef(function FeaturedPostCard(
  props,
  ref
) {
  const { article } = props;

  if (!article) return null;

  const { title, date, excerpt, image, sx, link, author } = article;

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
              width: { md: "532px", lg: "820px" },
              height: { md: "487px", lg: "487px" },
              borderRadius: "5px",
              filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1))",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "0 0 0 12px",
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <Typography
              color={neutral[900]}
              textAlign="left"
              variant="h2SemiBold"
            >
              {title}
            </Typography>
            <Typography
              color={neutral[500]}
              textAlign="left"
              typography="p1"
              sx={{
                display: author ? "block" : "none",
              }}
            >
              {author}
            </Typography>
            <Typography color={neutral[500]} textAlign="left" typography="p1">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>

            <LineClampedRichTypography
              color={neutral[900]}
              textAlign="left"
              variant="subheading"
              lineClamp={6}
            >
              {excerpt}
            </LineClampedRichTypography>
            <CardActions
              href={link?.href}
              component={link?.href ? Link : undefined}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: neutral[900],
                typography: "p3",
              }}
            >
              Read More
            </CardActions>
          </CardContent>
        </Card>
      </Section>
    </Box>
  );
});

export default FeaturedPostCard;
