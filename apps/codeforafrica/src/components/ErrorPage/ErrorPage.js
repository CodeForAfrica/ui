import Box from "@mui/material/Box";

import ErrorHero from "@/codeforafrica/components/ErrorHero";
import Page from "@/codeforafrica/components/Page";
import RelatedStories from "@/codeforafrica/components/RelatedStories";

function ErrorPage({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "hero":
            return (
              <ErrorHero
                title={section.title}
                subtitle={section.subtitle}
                key={section.slug}
                {...props}
              />
            );
          case "news-stories":
            return (
              <Box
                key={section.slug}
                sx={{
                  bgcolor: { xs: "inherit", sm: "background.default" },
                }}
              >
                <RelatedStories
                  {...section}
                  sx={{ px: { xs: "20px", sm: 0 } }}
                />
              </Box>
            );
          default:
            return null;
        }
      })}
    </Page>
  );
}

export default ErrorPage;
