import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

function hero(block) {
  const { image: media, messages: messageList, title, ...other } = block;
  const image = imageFromMedia({ alt: title, ...media });
  const messages = messageList.map((message) => message.message);

  return {
    ...other,
    image,
    messages,
    slug: "hero",
    title,
  };
}

export default hero;
