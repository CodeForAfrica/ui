import ContactForm from "../blocks/ContactForm";
import CustomPageHeader from "../blocks/CustomPageHeader";
import Error from "../blocks/Error";
import GetInTouch from "../blocks/GetInTouch";
import GetInvolved from "../blocks/GetInvolved";
import GuidingPrinciples from "../blocks/GuidingPrinciples";
import Hero from "../blocks/Hero";
import JoinOurSlack from "../blocks/JoinOurSlack";
import MeetOurTeam from "../blocks/MeetOurTeam";
import OurImpact from "../blocks/OurImpact";
import OurPartners from "../blocks/OurPartners";
import OurTeam from "../blocks/OurTeam";
import OurWork from "../blocks/OurWork";
import PageHeader from "../blocks/PageHeader";
import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";
import formatDraftUrl from "../utils/formatDraftUrl";

const Pages = {
  slug: "pages",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  versions: {
    drafts: true,
  },
  admin: {
    defaultColumns: ["fullTitle", "updatedAt"],
    preview: (doc, options) => formatDraftUrl("pages", doc, options),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    fullTitle(),
    slug(),
    {
      name: "blocks",
      type: "blocks",
      // Generally sort blocks alphabetically but keep related blocks next to
      // each other e.g. while alphabecially CustomPageHeader should be with C,
      // it's functiaonally equivalent with PageHeader so we keep it next to
      // PageHeader
      blocks: [
        ContactForm,
        Error,
        GetInTouch,
        GetInvolved,
        GuidingPrinciples,
        Hero,
        JoinOurSlack,
        MeetOurTeam,
        PageHeader,
        CustomPageHeader,
        OurImpact,
        OurPartners,
        OurTeam,
        OurWork,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

export default Pages;
