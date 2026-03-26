import { Figure } from "@commons-ui/next";
import { Box, IconButton, Modal, SvgIcon } from "@mui/material";
import { forwardRef, useCallback, useEffect } from "react";

import ChevronRightDouble from "@/trustlab/assets/icons/Type=chevronRightDouble, Size=20, Color=currentColor.svg";

const ImageLightbox = forwardRef(function ImageLightbox(props, ref) {
  const {
    open,
    onClose,
    images = [],
    currentIndex = 0,
    onPrevious,
    onNext,
  } = props;

  const currentImage = images[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose?.();
      } else if (event.key === "ArrowLeft" && hasPrevious) {
        onPrevious?.();
      } else if (event.key === "ArrowRight" && hasNext) {
        onNext?.();
      }
    },
    [onClose, onPrevious, onNext, hasPrevious, hasNext],
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    return undefined;
  }, [open, handleKeyDown]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  if (!currentImage) {
    return null;
  }

  return (
    <Modal
      ref={ref}
      open={open}
      onClose={onClose}
      aria-labelledby="image-lightbox"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        onClick={handleBackdropClick}
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          outline: "none",
        }}
      >
        {/* Previous button */}
        {hasPrevious && (
          <IconButton
            onClick={onPrevious}
            aria-label="Previous image"
            sx={{
              position: "absolute",
              left: { xs: 8, sm: 24 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
              zIndex: 1,
            }}
          >
            <SvgIcon
              component={ChevronRightDouble}
              sx={{
                fill: "none",
                fontSize: "24px",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 20 20"
            />
          </IconButton>
        )}

        {/* Next button */}
        {hasNext && (
          <IconButton
            onClick={onNext}
            aria-label="Next image"
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 24 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
              zIndex: 1,
            }}
          >
            <SvgIcon
              component={ChevronRightDouble}
              sx={{
                fill: "none",
                fontSize: "24px",
              }}
              viewBox="0 0 20 20"
            />
          </IconButton>
        )}

        {/* Image container */}
        <Box
          sx={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Figure
            ImageProps={{
              alt: currentImage.alt || "",
              src: currentImage.url || currentImage.src,
              sx: {
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "90vh",
              },
            }}
            sx={{
              m: 0,
              width: "75vw",
              height: "75vh",
              position: "relative",
            }}
          />
        </Box>

        {/* Image counter */}
        {images.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 16, sm: 24 },
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontSize: "0.875rem",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              px: 2,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            {currentIndex + 1} / {images.length}
          </Box>
        )}
      </Box>
    </Modal>
  );
});

export default ImageLightbox;
