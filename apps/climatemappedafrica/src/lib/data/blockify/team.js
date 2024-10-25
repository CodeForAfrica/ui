import { countries } from "@/climatemappedafrica/lib/data/countries";
import {
  getMembers,
  imageFromMedia,
} from "@/climatemappedafrica/lib/data/utils";
import { equalsIgnoreCase } from "@/climatemappedafrica/utils";

const getCountryFromCode = (alpha3) =>
  countries.find((c) => equalsIgnoreCase(c.alpha3, alpha3)) ?? null;

async function team({ block, api, context }) {
  const { query } = context;
  const data = await getMembers(api, query);
  let members = null;
  if (data?.results?.length) {
    members = data.results.map((member) => {
      const { alt, src: image } = imageFromMedia(member.image);
      let description = member.title;
      const country = getCountryFromCode(member.country);
      if (country) {
        description = `${description}, ${country.label.en}`;
      }
      const title = member.name;

      return {
        alt,
        description,
        title,
        image,
      };
    });
  }
  return {
    ...block,
    members,
    slug: block.blockType,
  };
}

export default team;
