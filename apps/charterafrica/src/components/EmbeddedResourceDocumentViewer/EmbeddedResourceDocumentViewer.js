import { Section } from "@commons-ui/core";
import { Typography, Box, Grid, Button } from "@mui/material";
import React from "react";

import ExternalLinkIcon from "@/charterafrica/assets/icons/Type=external-link, Size=24, Color=White.svg";
import { neutral } from "@/charterafrica/colors";
import ShareThisPage from "@/charterafrica/components/ShareThisPage";

const EmbeddedResourceDocumentViewer = React.forwardRef(
  function EmbeddedResourceDocumentViewer(props, ref) {
    const { title, html, labels } = props;

    return (
      <Box
        sx={{
          backgroundColor: "#fff",
        }}
        ref={ref}
      >
        <Section
          sx={{
            px: { xs: 5, sm: 0 },
            py: { xs: 5, md: 7.5 },
          }}
        >
          <Grid container spacing={4} direction={{ xs: "column", md: "row" }}>
            <Grid
              item
              xs={12}
              md={8}
              padding={0}
              container
              direction="column"
              gap={2}
              alignItems={{ xs: "center", md: "flex-start" }}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                {title}
              </Typography>
              <Box
                backgroundColor="white"
                border="1px solid"
                borderColor={neutral[800]}
                width={{
                  lg: "720px",
                  sm: "648px",
                  xs: "330px",
                }}
                sx={{
                  mt: 5,
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              gap={2}
              direction={{ xs: "column", sm: "row" }}
              sx={{
                p: 0,
              }}
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<ExternalLinkIcon />}
                href=""
                target="_blank"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "200px",
                  },
                  height: "50px",
                }}
              >
                {labels.openDocument}
              </Button>
              <Grid
                item
                xs={12}
                sx={{
                  height: "100%",
                }}
              >
                <ShareThisPage
                  title="Share this document"
                  sx={{
                    alignItems: {
                      xs: "center",
                      md: "flex-end",
                    },
                    py: 2,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Section>
      </Box>
    );
  }
);

export default EmbeddedResourceDocumentViewer;
