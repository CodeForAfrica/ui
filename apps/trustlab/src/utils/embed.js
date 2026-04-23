function getEmbedOrigin(src) {
  if (!src) {
    return null;
  }

  try {
    return new URL(src).origin;
  } catch {
    return null;
  }
}

export default getEmbedOrigin;
