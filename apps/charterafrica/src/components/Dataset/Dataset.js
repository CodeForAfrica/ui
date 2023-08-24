import { Section, RichTypography } from "@commons-ui/core";
import { Typography, Box, Grid, Button, Chip } from "@mui/material";

import ExternalLinkIcon from "@/charterafrica/assets/icons/Type=external-link, Size=24, Color=White.svg";
import { neutral } from "@/charterafrica/colors";
import DatasetCard from "@/charterafrica/components/DatasetCard";
import ShareThisPage from "@/charterafrica/components/ShareThisPage";
import formatDateTime from "@/charterafrica/utils/formatDate";

function Dataset({
  title,
  updated,
  created,
  formats,
  notes,
  labels,
  related,
  pageUrl,
  url,
}) {
  const createdAt = formatDateTime(created, { includeTime: false });
  const updatedAt = formatDateTime(updated, { includeTime: false });

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
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ md: "space-between" }}
        >
          <Grid item xs={12} md={8}>
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
            <Typography
              variant="p1"
              color="neutral.main"
              sx={{
                mb: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {updatedAt !== createdAt ? (
                <>
                  <Typography
                    variant="inherit"
                    color="inherit"
                    component="span"
                  >
                    {`${labels.updated} ${updatedAt}`}
                  </Typography>
                  <Typography
                    variant="inherit"
                    color="inherit"
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" }, px: 1 }}
                  >
                    |
                  </Typography>
                </>
              ) : null}
              <Typography variant="inherit" color="inherit" component="span">
                {`${labels.created} ${createdAt}`}
              </Typography>
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
                sx={{
                  gap: 0.625,
                }}
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
                      display: "flex",
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
            md="auto"
            container
            direction={{ xs: "column", sm: "row", md: "column" }}
            alignItems={{
              xs: "flex-start",
              sm: "center",
              md: "flex-start",
            }}
            justifyContent={{
              xs: "center",
              sm: "space-between",
              md: "flex-start",
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
                mb: 0.625,
              }}
            >
              {labels.backToDatasets}
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
              {labels.openDataset}
            </Button>
            {/* <Grid item xs={12}> */}
            <ShareThisPage
              title={labels.shareDataset}
              sx={{
                alignItems: {
                  xs: "center",
                  sm: "flex-end",
                },
                pt: { xs: 2, sm: 0, md: 2 },
              }}
            />
            {/* </Grid> */}
          </Grid>
        </Grid>
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
