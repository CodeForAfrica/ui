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

import { secondary } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";

const FeaturedPostCard = React.forwardRef(function FeaturedPostCard(
  props,
  ref
) {
  const { author, category, date, excerpt, image, link, sx, title } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        ...sx,
      }}
      ref={ref}
    >
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}>
        <LineClampedRichTypography
          color="neutral.dark"
          display={{ xs: "flex", md: "none" }}
          justifyContent="center"
          variant="h3"
          lineClamp={1}
        >
          {category}
        </LineClampedRichTypography>
        <Card
          sx={{
            display: { xs: "none", md: "flex" },
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
              color="neutral.dark"
              textAlign="left"
              variant="h2SemiBold"
            >
              {title}
            </Typography>
            {author?.length ? (
              <Typography
                color="neutral.main"
                textAlign="left"
                typography="p1"
                sx={{
                  display: author ? "block" : "none",
                }}
              >
                {author}
              </Typography>
            ) : null}

            <Typography color="neutral.main" textAlign="left" variant="p1">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>

            <RichText
              color="neutral.dark"
              textAlign="left"
              variant="subheading"
              lineClamp={6}
              elements={excerpt}
            />

            <CardActions>
              <Link
                color="neutral.dark"
                href={link?.href}
                underline="always"
                variant="p3"
              >
                Read More
              </Link>
            </CardActions>
          </CardContent>
        </Card>
      </Section>
    </Box>
  );
});

export default FeaturedPostCard;
