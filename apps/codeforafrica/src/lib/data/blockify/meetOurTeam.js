import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

function meetOurTeam(block) {
  const { image: media, actionButton, title, ...other } = block;
  const image = imageFromMedia({ alt: title, ...media });
  const { href, label } = actionButton;

  return {
    ...other,
    image,
    action: {
      href,
      content: label,
    },
    slug: "meet-our-team",
    title,
  };
}

export default meetOurTeam;
