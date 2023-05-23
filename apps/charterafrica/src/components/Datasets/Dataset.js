import { Section, RichTypography } from "@commons-ui/core";
import { Typography, Box, Grid, Button, Chip } from "@mui/material";

import GithubIcon from "@/charterafrica/assets/icons/github.svg";
import ExternalLinkIcon from "@/charterafrica/assets/icons/Type=external-link, Size=24, Color=White.svg";
import ShareThisPage from "@/charterafrica/components/ShareThisPage";
import formatDateTime from "@/charterafrica/utils/formatDate";

function Dataset({ title, url, updated, created, formats, notes }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Section
        sx={{
          py: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="p1" color="neutral.main" sx={{ mb: 1 }}>
              Updated {formatDateTime(updated, { includeTime: false })} |
              created {formatDateTime(created, { includeTime: false })}
            </Typography>
            {formats.length ? (
              <Grid
                item
                xs={12}
                md={4}
                order={{ xs: 3, sm: 4 }}
                container
                justifyContent="flex-start"
                alignItems="center"
              >
                {formats.map((format) => (
                  <Chip
                    label={format}
                    sx={(theme) => ({
                      backgroundColor:
                        format === "PDF"
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                      ...theme.typography.caption,
                      borderRadius: "10px",
                      mr: 1.75,
                    })}
                    key={format}
                  />
                ))}
              </Grid>
            ) : null}
            <RichTypography
              color="common.black"
              order={1}
              variant="p1"
              sx={{ my: 4 }}
            >
              {notes}
            </RichTypography>
            <Box
              sx={{
                backgroundImage: "url(/images/dataset-background.png)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height: "450px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  startIcon={<ExternalLinkIcon />}
                >
                  Open Dataset
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} container direction="column" gap={2}>
            <Typography
              variant="p1"
              component="a"
              color="neutral.dark"
              href="/resources/datasets"
            >
              Back to Database
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<ExternalLinkIcon />}
              href={url}
              target="_blank"
              sx={{
                width: "200px",
              }}
            >
              Open Dataset
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<GithubIcon />}
              href=""
              target="_blank"
              sx={{
                width: "200px",
              }}
            >
              Github
            </Button>
            <Grid>
              <ShareThisPage title="Share this Page" />
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}

export default Dataset;
