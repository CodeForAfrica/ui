import { Section } from "@commons-ui/core";
import { Figure, RichTypography } from "@commons-ui/next";
import { Box, Stack } from "@mui/material";
import React, { forwardRef, useCallback, useRef, useState } from "react";

const ITEMS_PER_PAGE = 4;

const HorizontalGallery = forwardRef(function HorizontalGallery(
  { title, images },
  ref,
) {
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);

  const pageCount = Math.ceil((images?.length ?? 0) / ITEMS_PER_PAGE);

  const handleDotClick = useCallback((pageIndex) => {
    if (!scrollRef.current) {
      return;
    }
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: pageIndex * containerWidth,
      behavior: "smooth",
    });
    setActivePage(pageIndex);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) {
      return;
    }
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const page = Math.round(scrollLeft / offsetWidth);
    setActivePage(page);
  }, []);

  const chunks = [];
  for (let i = 0; i < (images?.length ?? 0); i += ITEMS_PER_PAGE) {
    chunks.push(images.slice(i, i + ITEMS_PER_PAGE));
  }

  if (!images?.length) {
    return null;
  }

  return (
    <Section
      sx={{
        py: 8,
        px: {
          xs: 2.5,
          sm: 0,
        },
      }}
      ref={ref}
    >
      <RichTypography
        variant="h3"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        {title}
      </RichTypography>
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {chunks.map((chunk) => (
          <Box
            key={chunk[0].image.id}
            sx={{
              flex: "0 0 100%",
              scrollSnapAlign: "start",
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              alignContent: "flex-start",
              gap: 2,
            }}
          >
            {chunk.map(({ image }) => (
              <Box
                key={image.id}
                sx={{
                  flex: {
                    xs: "0 0 calc(50% - 8px)",
                    sm: "0 0 calc(25% - 12px)",
                  },
                  minWidth: 0,
                }}
              >
                <Figure
                  ImageProps={{
                    alt: image.alt || "",
                    src: image.url,
                  }}
                  sx={{
                    m: 0,
                    height: { xs: 120, sm: 264 },
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                    width: "100%",
                    "&:hover": {
                      filter: "none",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      {pageCount > 1 && (
        <Stack direction="row" spacing={0.75} sx={{ mt: 2 }}>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Box
                key={`page-${pageNumber}`}
                component="button"
                onClick={() => handleDotClick(pageNumber - 1)}
                aria-label={`Go to page ${pageNumber}`}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "none",
                  p: 0,
                  cursor: "pointer",
                  backgroundColor:
                    pageNumber - 1 === activePage ? "text.primary" : "grey.400",
                  transition: "background-color 0.2s",
                }}
              />
            ),
          )}
        </Stack>
      )}
    </Section>
  );
});

export default HorizontalGallery;
