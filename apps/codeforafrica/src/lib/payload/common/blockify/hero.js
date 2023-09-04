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
      url,
      alt,
    },
  };
}

export default hero;
