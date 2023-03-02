import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
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
  const { author, date, excerpt, image, link, sx, title } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <Box
      display={{ xs: "none", md: "flex" }}
      sx={{
        backgroundColor: secondary[50],
        ...sx,
      }}
      ref={ref}
    >
      <Section sx={{ px: { xs: 5, sm: 0 }, pt: 5 }}>
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
            <LineClampedRichTypography
              color="neutral.dark"
              lineClamp={4}
              textAlign="left"
              variant="h2SemiBold"
              sx={(theme) => ({
                maxHeight: `calc(${theme.typography.h2SemiBold.fontSize}px * ${theme.typography.h2SemiBold.lineHeight} * 4)`,
              })}
            >
              {title}
            </LineClampedRichTypography>
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
              {date}
            </Typography>
            <RichText
              sx={{
                maxHeight: 24 * 6,
              }}
              color="neutral.dark"
              textAlign="left"
              variant="subheading"
              lineClamp={6}
              elements={excerpt}
            />

            <CardActions sx={{ p: 0 }}>
              {link?.href && (
                <Link
                  color="neutral.dark"
                  href={link?.href}
                  underline="always"
                  variant="p3"
                >
                  Read More
                </Link>
              )}
            </CardActions>
          </CardContent>
        </Card>

        <Divider sx={{ pt: 5 }} />
      </Section>
    </Box>
  );
});

export default FeaturedPostCard;
