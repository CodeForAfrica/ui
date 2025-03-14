import { Section } from "@commons-ui/core";
import { RichTypography, Link } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";

import heroBg from "@/climatemappedafrica/assets/images/bg-map-white.jpg";

function ExplorePageError({ error: { code, message }, redirectPage }) {
  return (
    <Box
      sx={{
        pb: 5,
        position: "relative",
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage: `url(${heroBg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Section
        sx={{
          paddingBottom: { xs: "40px", md: "22px", lg: "22px" },
          px: 0,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <RichTypography variant="h1">{code}</RichTypography>
            <RichTypography variant="h5">{message}</RichTypography>
            <Link
              href={`/${redirectPage}`}
              sx={{
                mt: 2,
                display: "inline-block",
                textDecoration: "none",
                fontWeight: "bold",
                color: "primary.main",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Go back
            </Link>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}

export default ExplorePageError;
