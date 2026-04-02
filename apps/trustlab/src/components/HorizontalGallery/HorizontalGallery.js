import { Section } from "@commons-ui/core";
import { Figure, RichTypography } from "@commons-ui/next";
import { Box, Stack } from "@mui/material";
import React, { forwardRef, useCallback, useRef, useState } from "react";

import ImageLightbox from "@/trustlab/components/ImageLightbox";

const ITEMS_PER_PAGE = 4;

const HorizontalGallery = forwardRef(function HorizontalGallery(
  { title, images },
  ref,
) {
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const handleImageClick = useCallback((imageIndex) => {
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleLightboxPrevious = useCallback(() => {
    setLightboxIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleLightboxNext = useCallback(() => {
    setLightboxIndex((prev) => Math.min(images.length - 1, prev + 1));
  }, [images?.length]);

  const flatImages = images?.map(({ image }) => image) || [];

  if (!images?.length) {
    return null;
  }

  return (
    <Box sx={{ backgroundColor: "common.white" }} ref={ref}>
      <Section
        sx={{
          py: 2,
          px: {
            xs: 2.5,
            sm: 0,
          },
        }}
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
          {chunks.map((chunk, chunkIndex) => (
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
              {chunk.map(({ image }, itemIndex) => {
                const flatIndex = chunkIndex * ITEMS_PER_PAGE + itemIndex;
                return (
                  <Box
                    key={image.id}
                    onClick={() => handleImageClick(flatIndex)}
                    sx={{
                      flex: {
                        xs: "0 0 calc(50% - 8px)",
                        sm: "0 0 calc(25% - 12px)",
                      },
                      minWidth: 0,
                      cursor: "pointer",
                    }}
                  >
                    <Figure
                      ImageProps={{
                        alt: image.alt || "",
                        src: image.url,
                        sx: {
                          objectFit: "cover",
                        },
                      }}
                      sx={{
                        m: 0,
                        height: { xs: 178, sm: 183, md: 262 },
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        width: "100%",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          filter: "none",
                          transform: "scale(1.02)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        },
                      }}
                    />
                  </Box>
                );
              })}
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
                      pageNumber - 1 === activePage
                        ? "text.primary"
                        : "grey.400",
                    transition: "background-color 0.2s",
                  }}
                />
              ),
            )}
          </Stack>
        )}
      </Section>

      <ImageLightbox
        open={lightboxOpen}
        onClose={handleLightboxClose}
        images={flatImages}
        currentIndex={lightboxIndex}
        onPrevious={handleLightboxPrevious}
        onNext={handleLightboxNext}
      />
    </Box>
  );
});

export default HorizontalGallery;
