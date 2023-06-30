import AgaInfographic from "../blocks/AgaInfographic";
import CommunityPlatforms from "../blocks/CommunityPlatforms";
import Datasets from "../blocks/Datasets";
import DemocracyHelpdeskContent from "../blocks/DemocracyHelpdeskPageContent";
import Documents from "../blocks/Documents";
import Ecosystem from "../blocks/Ecosystem";
import EmbeddedChart from "../blocks/EmbeddedChart";
import EmbeddedDocuments from "../blocks/EmbeddedDocuments";
import EmbeddedPlaylist from "../blocks/EmbeddedPlaylist";
import Error from "../blocks/Error";
import FAQ from "../blocks/FAQ";
import FeaturedPost from "../blocks/FeaturedPost";
import Global from "../blocks/Global";
import Grantees from "../blocks/Grantees";
import GuidingPrincipals from "../blocks/GuidingPrinciples";
import Hero from "../blocks/Hero";
import Impressum from "../blocks/Impressum";
import LongForm from "../blocks/LongForm";
import Mooc from "../blocks/Mooc";
import Opportunities from "../blocks/Opportunities";
import PageDescription from "../blocks/PageDescription";
import PageHeader from "../blocks/PageHeader";
import PageInfo from "../blocks/PageInfo";
import Partners from "../blocks/Partners";
import Resources from "../blocks/Resources";
import Spotlight from "../blocks/Spotlight";
import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";
import formatDraftUrl from "../utils/formatDraftUrl";

const Pages = {
  slug: "pages",
  admin: {
    defaultColumns: ["fullTitle", "updatedAt"],
    preview: (doc, options) => formatDraftUrl("pages", doc, options),
    useAsTitle: "title",
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
        AgaInfographic,
        CommunityPlatforms,
        Datasets,
        DemocracyHelpdeskContent,
        Documents,
        Ecosystem,
        EmbeddedDocuments,
        EmbeddedPlaylist,
        Error,
        FAQ,
        FeaturedPost,
        EmbeddedChart,
        Global,
        GuidingPrincipals,
        Grantees,
        Hero,
        Impressum,
        LongForm,
        Mooc,
        Opportunities,
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
