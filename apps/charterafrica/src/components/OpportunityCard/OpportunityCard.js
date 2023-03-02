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
import RichText from "@/charterafrica/components/RichText";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const {
    image,
    date,
    excerpt,
    link,
    title,
    config,
    registerLink,
    registerText,
  } = props;

  if (!title) {
    return null;
  }
  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: "none",
        backgroundColor: secondary[50],
        width: "270px",
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
          <Typography
            color="neutral.dark"
            variant="h6"
            sx={{
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <RichText
            color="neutral.dark"
            lineClamp={3}
            variant="p1"
            elements={excerpt}
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
              {config?.dateText ? `${config?.dateText}:` : null} {date}
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
