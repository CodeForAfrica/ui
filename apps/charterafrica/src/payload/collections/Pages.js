import DemocracyHelpdeskContent from "../blocks/DemocracyHelpdeskPageContent";
import DemocracyHelpdeskHeader from "../blocks/DemocracyHelpdeskPageHeader";
import Ecosystem from "../blocks/Ecosystem";
import Errors from "../blocks/Errors";
import Hero from "../blocks/Hero";
import Mooc from "../blocks/Mooc";
import PageInfo from "../blocks/PageInfo";
import Partners from "../blocks/Partners";
import Resources from "../blocks/Resources";
import Spotlight from "../blocks/Spotlight";
import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";

const Pages = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["fullTitle", "updatedAt"],
  },
  access: {
    read: () => true, // Everyone can read Pages
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    fullTitle(),
    slug(),
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        Hero,
        DemocracyHelpdeskContent,
        DemocracyHelpdeskHeader,
        Ecosystem,
        Errors,
        Mooc,
        PageInfo,
        Partners,
        Resources,
        Spotlight,
      ],
    },
  ],
};

export default Pages;
