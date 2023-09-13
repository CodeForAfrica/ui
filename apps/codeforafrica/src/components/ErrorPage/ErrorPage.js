import { Box } from "@mui/material";

import ErrorHero from "@/codeforafrica/components/ErrorHero";
import RelatedStories from "@/codeforafrica/components/RelatedStories";

function ErrorPage({ blocks, ...props }) {
  return blocks?.map((block) => {
    switch (block.slug) {
      case "error":
        return (
          <ErrorHero
            title={block.title}
            subtitle={block.subtitle}
            key={block.slug}
            {...props}
          />
        );
      case "news-stories":
        return (
          <Box
            key={block.slug}
            sx={{
              bgcolor: { xs: "inherit", sm: "background.default" },
            }}
          >
            <RelatedStories {...block} sx={{ px: { xs: "20px", sm: 0 } }} />
          </Box>
        );
      default:
        return null;
    }
  });
}

export default ErrorPage;
