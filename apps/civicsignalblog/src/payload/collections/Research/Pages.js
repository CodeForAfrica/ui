import canRead from "@/civicsignalblog/payload/access/applications/research";
import CustomPageHeader from "@/civicsignalblog/payload/blocks/CustomPageHeader";
import Error from "@/civicsignalblog/payload/blocks/Error";
import FeaturedStories from "@/civicsignalblog/payload/blocks/FeaturedStories";
import LongForm from "@/civicsignalblog/payload/blocks/LongForm";
import PageHeader from "@/civicsignalblog/payload/blocks/PageHeader";
import Posts from "@/civicsignalblog/payload/blocks/Posts";
import { RESEARCH } from "@/civicsignalblog/payload/lib/data/common/applications";
import pages from "@/civicsignalblog/payload/utils/createPagesCollection";

const Pages = pages({
  pageSlug: `${RESEARCH}-pages`,
  label: "Pages",
  group: "Publication",
  defaultColumns: ["fullTitle", "updatedAt"],
  blocks: [
    Error,
    FeaturedStories,
    PageHeader,
    Posts,
    CustomPageHeader,
    LongForm,
  ],
  access: {
    read: canRead,
  },
  adminOptions: {
    description: "Research",
  },
});

export default Pages;
