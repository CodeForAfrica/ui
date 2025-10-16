import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

function AirtableEmbedCard({
  title,
  icon: media,
  description,
  embedCode,
  embedButtonLabel,
}) {
  const [open, setOpen] = React.useState(false);
  const dialogTitleId = React.useId();
  const handleOpen = () => {
    if (embedCode) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const buttonLabel = embedButtonLabel || title;

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
        {embedCode ? (
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              mt: 2,
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
            {buttonLabel}
          </Button>
        ) : null}
      </CardActions>
      <Dialog
        aria-labelledby={dialogTitleId}
        fullWidth
        maxWidth={false}
        onClose={handleClose}
        open={Boolean(embedCode && open)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: { xs: "100%", md: "90vw" },
            m: { xs: 1, md: 2 },
          },
        }}
      >
        <DialogTitle id={dialogTitleId}>{title}</DialogTitle>
        <DialogContent
          dividers
          sx={{
            p: 0,
            "& .airtable-embed-container": {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <Box
            className="airtable-embed-container"
            sx={{
              width: "100%",
              "& iframe": {
                width: "100%",
                minHeight: { xs: 400, md: "70vh" },
              },
            }}
            dangerouslySetInnerHTML={
              embedCode
                ? {
                    __html: embedCode,
                  }
                : undefined
            }
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              backgroundColor: "#252B37",
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1F2937",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default AirtableEmbedCard;
