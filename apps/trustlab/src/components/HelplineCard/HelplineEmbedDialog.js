import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

function HelplineEmbedDialog({ closeLabel, embedCode, onClose, open, title }) {
  const dialogTitleId = React.useId();

  return (
    <Dialog
      aria-labelledby={dialogTitleId}
      fullWidth
      maxWidth={false}
      onClose={onClose}
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
          onClick={onClose}
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
          {closeLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HelplineEmbedDialog;
