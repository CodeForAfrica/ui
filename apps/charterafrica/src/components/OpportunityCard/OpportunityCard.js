import { Link } from "@commons-ui/next";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled,
  Grid,
} from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";

const StyledCardActionArea = styled(CardActionArea)(
  () => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`
);

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const { image, date, description, link, title, config } = props;

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
      <StyledCardActionArea>
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
          <Typography color="neutral.dark" variant="p1">
            {description}
          </Typography>
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
            {link?.href ? (
              <Grid item>
                <Link
                  color="neutral.dark"
                  href={link?.href}
                  underline="always"
                  variant="caption"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Register here
                </Link>
              </Grid>
            ) : null}
          </Grid>
        </CardContent>
      </StyledCardActionArea>
    </Card>
  );
});

export default OpportunityCard;
