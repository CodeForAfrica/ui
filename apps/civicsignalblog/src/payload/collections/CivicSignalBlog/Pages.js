import canRead from "../../access/applications/researchBlog";
import CustomPageHeader from "../../blocks/CustomPageHeader";
import Error from "../../blocks/Error";
import FeaturedStories from "../../blocks/FeaturedStories";
import LongForm from "../../blocks/LongForm";
import PageHeader from "../../blocks/PageHeader";
import Posts from "../../blocks/Posts";
import pages from "../../fields/pages";

const Pages = pages({
  pageSlug: "pages",
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
    description: "Research Blog",
  },
});

export default Pages;
