import formatDateTime from "@/charterafrica/utils/formatDate";

async function post(block, _, { locale }) {
  const { coverImage, url, ...other } = block;
  let image = null;
  if (coverImage?.url) {
    const { alt, url: imageUrl } = block.coverImage;
    image = {
      alt: alt || block.title,
      url: imageUrl,
    };
  }

  return {
    ...other,
    author: block.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    content: block.content ?? null,
    date: formatDateTime(block.publishedOn, { locale }),
    image,
    link: {
      href: url,
    },
  };
}

export default post;
