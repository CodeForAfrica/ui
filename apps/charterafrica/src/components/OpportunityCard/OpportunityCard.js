import { Link } from "@commons-ui/next";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActions,
} from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const {
    config,
    date,
    excerpt,
    image,
    link,
    registerLink,
    registerText,
    sx,
    title,
    topic,
    variant,
  } = props;

  if (!title) {
    return null;
  }
  let titleTransform = "uppercase";
  let titleVariant = "h5SemiBold";
  if (variant === "event") {
    titleVariant = "h6";
    titleTransform = "none";
  }
  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: "none",
        backgroundColor: secondary[50],
        width: "270px",
        ...sx,
      }}
    >
      <CardActionArea
        component={link?.href ? Link : undefined}
        href={link?.href}
        sx={{
          ".MuiCardActionArea-focusHighlight": {
            background: "transparent",
          },
        }}
      >
        <CardMedia
          component="img"
          height={187.26}
          width={270}
          image={image.url}
          alt={image.alt}
          sx={{
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            objectFit: "cover",
          }}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "0",
            marginTop: "20px",
            "&:last-child": {
              paddingBottom: "0",
            },
          }}
        >
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={3}
            textTransform={titleTransform}
            variant={titleVariant}
            sx={(theme) => ({
              minHeight: `calc(${theme.typography[titleVariant].fontSize}px * ${theme.typography[titleVariant].lineHeight} * 3)`,
            })}
          >
            {title}
          </LineClampedRichTypography>
          {variant === "event" ? (
            <LineClampedRichTypography
              color="neutral.dark"
              html={false}
              lineClamp={1}
              variant="captionCap"
              sx={(theme) => ({
                minHeight: `calc(${theme.typography.captionCap.fontSize}px * ${theme.typography.captionCap.lineHeight} * 1)`,
              })}
            >
              {topic}
            </LineClampedRichTypography>
          ) : null}
          <RichText
            color="neutral.dark"
            lineClamp={3}
            variant="p1"
            elements={excerpt}
            sx={(theme) => ({
              height: `calc(${
                theme.typography.p1.fontSize * theme.typography.p1.lineHeight
              }px * 3)`,
            })}
          />
        </CardContent>
      </CardActionArea>
      <CardActions
        disableSpacing
        sx={{
          padding: "0",
          paddingTop: 2,
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography
              color="neutral.dark"
              variant="caption"
              sx={{
                textTransform: "uppercase",
              }}
            >
              {`${config?.dateText || ""}: ${date}`}
            </Typography>
          </Grid>
          {registerLink?.href ? (
            <Grid item>
              <Link
                color="neutral.dark"
                href={registerLink?.href}
                underline="always"
                variant="caption"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {registerText || "Register here"}
              </Link>
            </Grid>
          ) : null}
        </Grid>
      </CardActions>
    </Card>
  );
});

export default OpportunityCard;
