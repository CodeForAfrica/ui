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
          px: { xs: 5, sm: 0 },
          py: { xs: 5, md: 7.5 },
        }}
      >
        <Grid container spacing={4} direction={{ xs: "column", sm: "row" }}>
          <Grid item xs={12} md={8} padding={0}>
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
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            gap={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 0,
            }}
          >
            <Typography
              variant="p1"
              component="a"
              color="neutral.dark"
              href="/resources/datasets"
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
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
                width: {
                  xs: "100%",
                  sm: "200px",
                },
                height: "50px",
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
                width: {
                  xs: "100%",
                  sm: "200px",
                },
                height: "50px",
              }}
            >
              Github
            </Button>
            <Grid>
              <ShareThisPage
                title="Share this Page"
                sx={{
                  alignItems: {
                    xs: "center",
                    md: "flex-start",
                  },
                  py: 2,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundImage: "url(/images/dataset-background.png)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: {
              xs: "100%",
              md: "720px",
            },
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
        <Typography
          variant="p1"
          component="a"
          color="neutral.dark"
          href="/resources/datasets"
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            my: 4,
            textAlign: "right",
          }}
        >
          Back to Database
        </Typography>
      </Section>
    </Box>
  );
}

export default Dataset;
