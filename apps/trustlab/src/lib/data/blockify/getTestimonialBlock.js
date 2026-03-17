async function getTestimonialBlock(block) {
  const { title, description, image, signatureIcon, ...rest } = block;

  const resolvedImage = image ?? null;
  const resolvedSignatureIcon = signatureIcon ?? null;

  return {
    ...rest,
    slug: "testimonial",
    title,
    description,
    image: resolvedImage,
    signatureIcon: resolvedSignatureIcon,
  };
}

export default getTestimonialBlock;
