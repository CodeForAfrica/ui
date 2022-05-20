import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Image from "next/image";
import React from "react";

import ArticlePage from "@/codeforafrica/components/ArticlePage";
import Page from "@/codeforafrica/components/Page";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ article, sections, ...props }) {
  return (
    <Page {...props}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "163px", md: "600px" },
        }}
      >
        <Image
          alt="article-featured-image"
          src={article?.coverImage?.src}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      {article ? (
        <Section
          sx={{
            px: { xs: "20px", sm: 0 },
            maxWidth: {
              sm: "648px",
              md: "912px",
            },
          }}
        >
          <ArticlePage
            title={article?.title}
            date="Jan 6, 2022"
            subheader="Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed"
            content="Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat. Duis maecenas per erat odio quisque accumsan"
            author="Brenda Nyokabi"
            profession="Technologist"
            tags={article?.tags}
          />
        </Section>
      ) : null}
      {sections?.map((section) => {
        switch (section.slug) {
          case "related-stories":
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

export async function getStaticPaths() {
  const paths = [...Array(13).keys()].map((_, i) => ({
    params: { slug: `article-${i + 1}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/stories/${slug}` });
}

export default Index;
