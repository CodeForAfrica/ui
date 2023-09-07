function hero(block) {
  const {
    title,
    richTitle,
    type,
    subtitle,
    messages: messageList,
    image: { url, alt } = {},
  } = block;

  const messages = messageList.map((message) => message.message);
  return {
    title: richTitle || title,
    subtitle,
    messages,
    image: url ? { src: url, alt } : null,
    slug: type,
  };
}

export default hero;
