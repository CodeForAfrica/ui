import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import HelplineEmbedDialog from "./HelplineEmbedDialog";

function HelplineCard({
  title,
  icon: media,
  description,
  link,
  embedCode,
  embedButtonLabel,
}) {
  const hasEmbed = Boolean(embedCode);
  const [open, setOpen] = useState(false);
  const buttonLabel = embedButtonLabel || link?.label || title;

  const handleOpen = () => {
    if (hasEmbed) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card elevation={0} gap={2} key={title}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 0 }}
      >
        <CardMedia
          component="img"
          image={media?.url}
          alt={media?.alt}
          sx={{
            height: { xs: "108px", md: "180px" },
            width: { xs: "108px", md: "180px" },
          }}
        />
      </Box>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ width: "100%" }}>
          <Divider
            sx={{
              background: "black",
              my: 2,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
          <Divider
            sx={{
              background: "black",
              my: 2,
            }}
          />
        </Box>
        <LexicalRichText
          elements={description}
          TypographyProps={{
            gutterBottom: true,
            variant: "p2",
            sx: {
              mb: 0,
              textDecoration: "none",
            },
          }}
        />
      </CardContent>
      <CardActions sx={{ p: 0 }}>
        {(hasEmbed || link?.label) && (
          <Button
            component={!hasEmbed && link?.href ? Link : "button"}
            href={!hasEmbed ? link?.href : undefined}
            onClick={hasEmbed ? handleOpen : undefined}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              mt: 2,
              alignSelf: "start",
              backgroundColor: "#FFDE59",
              color: "black",
              height: 32,
              border: "2px solid black",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#FFDE59",
                border: "2px solid black",
              },
            }}
          >
            {hasEmbed ? buttonLabel : link?.label}
          </Button>
        )}
      </CardActions>
      <HelplineEmbedDialog
        embedCode={embedCode}
        onClose={handleClose}
        open={open}
        title={title}
      />
    </Card>
  );
}

export default HelplineCard;
