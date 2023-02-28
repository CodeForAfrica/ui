import CommunityPlatforms from "../blocks/CommunityPlatforms";
import DemocracyHelpdeskContent from "../blocks/DemocracyHelpdeskPageContent";
import Ecosystem from "../blocks/Ecosystem";
import Error from "../blocks/Error";
import FAQ from "../blocks/FAQ";
import FeaturedPost from "../blocks/FeaturedPost";
import Global from "../blocks/Global";
import GuidingPrincipals from "../blocks/GuidingPrinciples";
import Hero from "../blocks/Hero";
import Impressum from "../blocks/Impressum";
import KnowledgePageHeader from "../blocks/KnowledgePageHeader";
import Mooc from "../blocks/Mooc";
import PageDescription from "../blocks/PageDescription";
import PageHeader from "../blocks/PageHeader";
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
        CommunityPlatforms,
        DemocracyHelpdeskContent,
        Ecosystem,
        Error,
        FAQ,
        FeaturedPost,
        Global,
        GuidingPrincipals,
        Hero,
        Impressum,
        KnowledgePageHeader,
        Mooc,
        PageDescription,
        PageHeader,
        PageInfo,
        Partners,
        Resources,
        Spotlight,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

export default Pages;
