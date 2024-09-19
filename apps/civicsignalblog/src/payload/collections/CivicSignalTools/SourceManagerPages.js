import CustomPageHeader from "../../blocks/CustomPageHeader";
import Error from "../../blocks/Error";
import FeaturedStories from "../../blocks/FeaturedStories";
import LongForm from "../../blocks/LongForm";
import PageHeader from "../../blocks/PageHeader";
import Posts from "../../blocks/Posts";
import pages from "../../fields/pages";

const Pages = pages({
  pageSlug: "source-manager-pages",
  label: "Pages",
  group: "Source Manager",
  defaultColumns: ["fullTitle", "updatedAt"],
  blocks: [
    Error,
    FeaturedStories,
    PageHeader,
    Posts,
    CustomPageHeader,
    LongForm,
  ],
});

export default Pages;
