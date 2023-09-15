import {
  actionFromActionButton,
  imageFromMedia,
} from "@/codeforafrica/lib/data/utils";

function meetOurTeam(block) {
  const { image: media, actionButton, title, ...other } = block;
  const image = imageFromMedia({ alt: title, ...media });
  const action = actionFromActionButton({ ...actionButton });

  return {
    ...other,
    image,
    action,
    slug: "meet-our-team",
    title,
  };
}

export default meetOurTeam;
