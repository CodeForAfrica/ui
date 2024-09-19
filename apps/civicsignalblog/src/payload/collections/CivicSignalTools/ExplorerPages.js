import CustomPageHeader from "../../blocks/CustomPageHeader";
import Error from "../../blocks/Error";
import FeaturedStories from "../../blocks/FeaturedStories";
import LongForm from "../../blocks/LongForm";
import PageHeader from "../../blocks/PageHeader";
import Posts from "../../blocks/Posts";
import pages from "../../fields/pages";

const Pages = pages({
  pageSlug: "explorer-pages",
  label: "Pages",
  group: "Explorer",
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
