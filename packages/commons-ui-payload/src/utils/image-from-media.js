function imageFromMedia(media, options) {
  const { alt, url } = media || {};
  if (!url?.length) {
    return null;
  }
  return { alt, src: url, ...options };
}

export default imageFromMedia;
