function hero(block) {
  const {
    title,
    subtitle,
    messages: messageList,
    image: { url, alt },
  } = block;

  const messages = messageList.map((message) => message.message);
  return {
    title,
    subtitle,
    messages,
    image: {
      src: url,
      alt,
    },
    slug: "hero",
  };
}

export default hero;
