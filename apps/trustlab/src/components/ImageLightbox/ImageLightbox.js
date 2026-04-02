import { Box, Modal } from "@mui/material";
import { forwardRef, useCallback, useEffect } from "react";

import Image from "./Image";
import NavigationButton from "./NavigationButton";

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
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          outline: "none",
        }}
      >
        {hasPrevious && (
          <NavigationButton direction="previous" onClick={onPrevious} />
        )}
        {hasNext && <NavigationButton direction="next" onClick={onNext} />}

        <Image
          alt={currentImage.alt || ""}
          src={currentImage.url || currentImage.src}
          width={currentImage.width}
          height={currentImage.height}
        />

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
