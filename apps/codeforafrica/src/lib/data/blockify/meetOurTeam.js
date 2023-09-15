import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

function meetOurTeam(block) {
  const { image: media, actionButton, title, ...other } = block;
  const image = imageFromMedia({ alt: title, ...media });
  const { href } = actionButton;

  return {
    ...other,
    image,
    href,
    slug: "meet-our-team",
    title,
  };
}

export default meetOurTeam;
