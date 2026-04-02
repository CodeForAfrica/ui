import { Box } from "@mui/material";
import NextImage from "next/image";

/* Clicking the image itself must not close the modal. */
const stopPropagation = (e) => e.stopPropagation();

/**
 * Renders a CMS image at its natural constrained size.
 *
 * next/image requires either explicit dimensions or `fill`. Payload always
 * stores width/height for uploaded images, but this component handles the
 * absence gracefully by falling back to fill mode inside a bounded container.
 *
 * In the known-dimensions path the browser's replaced-element algorithm
 * applies max-width and max-height simultaneously while preserving aspect
 * ratio — no extra wrappers or CSS trickery needed.
 */
function Image({
  src,
  alt,
  width,
  height,
  maxWidth = "75vw",
  maxHeight = "75vh",
  style,
  ...props
}) {
  if (width && height) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={stopPropagation}
        style={{
          display: "block",
          width: "auto",
          height: "auto",
          maxWidth,
          maxHeight,
          ...style,
        }}
        {...props}
      />
    );
  }

  // Fallback for images without stored dimensions (malformed CMS data).
  return (
    <Box
      onClick={stopPropagation}
      sx={{ position: "relative", width: maxWidth, height: maxHeight }}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={maxWidth}
        style={{ objectFit: "contain", ...style }}
        {...props}
      />
    </Box>
  );
}

export default Image;
