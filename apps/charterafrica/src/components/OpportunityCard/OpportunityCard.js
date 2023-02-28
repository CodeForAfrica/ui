import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText/RichText";

const StyledCardActionArea = styled(CardActionArea)(
  () => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`
);

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const { image, deadline, description, title, config } = props;

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
      <StyledCardActionArea component="a">
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
          <RichText color="neutral.dark" variant="p1" elements={description} />
          {/* <Typography color="neutral.dark" variant="p1">
            {description}
          </Typography> */}
          <Typography
            color="neutral.dark"
            variant="caption"
            sx={{
              textTransform: "uppercase",
            }}
          >
            {config.deadlineText}: {deadline}
          </Typography>
        </CardContent>
      </StyledCardActionArea>
    </Card>
  );
});

export default OpportunityCard;
