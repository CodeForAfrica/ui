import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { Box } from "@mui/material";
import { ArticleJsonLd } from "next-seo";
import React from "react";

import ArticleHeader from "@/civicsignalblog/components/ArticleHeader";
import Author from "@/civicsignalblog/components/Author";
import ChoiceChip from "@/civicsignalblog/components/ChoiceChip";
import ChoiceChipGroup from "@/civicsignalblog/components/ChoiceChipGroup";
import CMSContent from "@/civicsignalblog/components/CMSContent";
import SectionDivider from "@/civicsignalblog/components/SectionDivider";
import equalsIgnoreCase from "@/civicsignalblog/utils/equalsIgnoreCase";
import site from "@/civicsignalblog/utils/site";

function ArticlePage({
  authors,
  excerpt,
  tags,
  title,
  coverImage: { src },
  content,
  publishedAt,
  publishedOn,
  primaryTag,
  updatedAt,
  url,
}) {
  const filteredTags = tags?.filter(
    (tag) => !equalsIgnoreCase(tag.name, primaryTag),
  );
  return (
    <>
      <Box component="article">
        <Figure
          ImageProps={{
            alt: title,
            sx: { objectFit: "cover" },
            src,
          }}
          sx={{
            width: "100%",
            height: "40vw",
          }}
        />
        <ArticleHeader
          title={title}
          date={publishedOn}
          excerpt={excerpt}
          sx={{
            maxWidth: {
              sm: "648px",
              md: "912px",
            },
            px: { xs: 2.5, sm: 0 },
            pt: { xs: 2.5, md: 7.5 },
          }}
        />
        <CMSContent
          variant="body3"
          sx={{
            maxWidth: {
              sm: "648px",
              md: "912px",
            },
            my: { xs: 2.5, md: 5 },
            px: { xs: 2.5, sm: 0 },
          }}
        >
          {content}
        </CMSContent>
        {authors?.length > 0 ? (
          <Section
            component="address"
            sx={{
              maxWidth: {
                sm: "648px",
                md: "912px",
              },
              mb: { xs: 2.5, md: 5 },
              px: { xs: 2.5, sm: 0 },
            }}
          >
            {authors?.map((author) => (
              <Author {...author} key={author.name} />
            ))}
          </Section>
        ) : null}
        {filteredTags?.length > 0 ? (
          <>
            <SectionDivider
              sx={{
                maxWidth: {
                  sm: "648px",
                  md: "912px",
                },
                my: { xs: 2.5, md: 5 },
                px: { xs: 2.5, sm: 0 },
              }}
            />
            <Section
              sx={{
                maxWidth: {
                  sm: "648px",
                  md: "912px",
                },
                pb: { xs: 2.5, md: 7.5 },
                px: { xs: 2.5, sm: 0 },
              }}
            >
              <ChoiceChipGroup color="default" sx={{ mt: { xs: 2.5, md: 5 } }}>
                {filteredTags.map((tag) => (
                  <ChoiceChip
                    label={tag.name}
                    value={tag.slug}
                    key={tag.slug}
                    component={Link}
                    href={`/${primaryTag}?tag=${tag.slug}`}
                    sx={{
                      "& .MuiChip-label": {
                        padding: 0,
                      },
                    }}
                  />
                ))}
              </ChoiceChipGroup>
            </Section>
          </>
        ) : null}
      </Box>
      <ArticleJsonLd
        useAppDir={false}
        url={url}
        title={title}
        images={[src]}
        datePublished={publishedAt}
        dateModified={updatedAt}
        authorName={authors?.map((a) => ({
          name: a.name,
        }))}
        // TODO(kilemensi): Add publisher field to the Post collection?
        publisherName="CivicSignal"
        publisherLogo={`${site.environmentUrl}android-chrome-512x512.png`}
        description={excerpt}
        isAccessibleForFree
      />
    </>
  );
}

export default ArticlePage;
