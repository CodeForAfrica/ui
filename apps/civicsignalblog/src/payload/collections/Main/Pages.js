import canRead from "../../access/applications/main";
import CustomPageHeader from "../../blocks/CustomPageHeader";
import Error from "../../blocks/Error";
import FeaturedStories from "../../blocks/FeaturedStories";
import LongForm from "../../blocks/LongForm";
import PageHeader from "../../blocks/PageHeader";
import Posts from "../../blocks/Posts";
import { MAIN } from "../../lib/data/common/applications";
import pages from "../../utils/createPagesCollection";

const Pages = pages({
  pageSlug: `${MAIN}-pages`,
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
});

export default Pages;
