import { Section, RichTypography } from "@commons-ui/core";
import { Typography, Box, Grid, Button, Chip } from "@mui/material";

import ExternalLinkIcon from "@/charterafrica/assets/icons/Type=external-link, Size=24, Color=White.svg";
import { neutral } from "@/charterafrica/colors";
import DatasetCard from "@/charterafrica/components/DatasetCard";
import ShareThisPage from "@/charterafrica/components/ShareThisPage";
import formatDateTime from "@/charterafrica/utils/formatDate";

function Dataset({
  title,
  source,
  url,
  updated,
  created,
  formats,
  notes,
  labels,
  related,
  pageUrl,
}) {
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
            <Typography
              variant="p1"
              component="a"
              color="neutral.dark"
              href={pageUrl}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  md: "none",
                },
                width: "100%",
                textAlign: "right",
                mb: 2,
              }}
            >
              {labels.backToDatasets}
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="p1" color="neutral.main" sx={{ mb: 1 }}>
              {`${labels.updated} ${formatDateTime(updated, {
                includeTime: false,
              })} | ${labels.created} ${formatDateTime(created, {
                includeTime: false,
              })}`}
            </Typography>
            {formats?.length ? (
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
              href={pageUrl}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
                width: "100%",
              }}
            >
              {labels.backToDatasets}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<ExternalLinkIcon />}
              href={source}
              target="_blank"
              sx={{
                width: {
                  xs: "100%",
                  sm: "200px",
                },
                height: "50px",
              }}
            >
              {labels.openDataset}
            </Button>
            <Grid item xs={12}>
              <ShareThisPage
                title={labels.shareDataset}
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
            mt: 5,
          }}
        >
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<ExternalLinkIcon />}
              href={url}
              target="_blank"
            >
              {labels.openDataset}
            </Button>
          </Box>
        </Box>
        <Typography
          variant="p1"
          component="a"
          color="neutral.dark"
          href={pageUrl}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            my: 4,
            textAlign: "right",
          }}
        >
          {labels.backToDatasets}
        </Typography>
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3" color="neutral.dark" gutterBottom>
                {labels.seeMoreDatasets}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="p1"
                component="a"
                color="neutral.dark"
                href={pageUrl}
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  width: "100%",
                }}
              >
                {labels.seeMoreDatasets}
              </Typography>
            </Grid>
          </Grid>

          {related?.map((dataset) => (
            <DatasetCard
              {...dataset}
              key={dataset.id}
              labels={labels}
              sx={{
                borderBottom: "none",
                "&:last-of-type": {
                  borderBottom: "1px solid",
                  borderColor: neutral[50],
                },
              }}
            />
          ))}
          <Typography
            variant="p1"
            component="a"
            color="neutral.dark"
            href={pageUrl}
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
              my: 4,
              textAlign: "left",
            }}
          >
            {labels.backToDatasets}
          </Typography>
        </Box>
      </Section>
    </Box>
  );
}

export default Dataset;
