import createCache from "@emotion/cache";

// Client-side Emotion cache with `prepend: true` to match MUI's styling order
export default function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
