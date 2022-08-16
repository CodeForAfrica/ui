import Box from "@mui/material/Box";

import ErrorCard from "@/codeforafrica/components/ErrorCard";
import Page from "@/codeforafrica/components/Page";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import { getPageStaticProps } from "@/codeforafrica/lib";

function NotFound({ sections, ...props }) {
  return (
    <Page {...props}>
      <ErrorCard {...props} />
      {sections?.map((section) => {
        switch (section.slug) {
          case "news-stories":
            return (
              <Box
                key={section.slug}
                sx={{
                  bgcolor: { xs: "inherit", sm: "background.main" },
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

export async function getStaticProps() {
  return getPageStaticProps({ slug: `/404` });
}

export default NotFound;
