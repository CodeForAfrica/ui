import canRead from "#civicsignalblog/payload/access/applications/main";
import PageHeader from "#civicsignalblog/payload/blocks/WebTools/PageHeader";
import ResourceList from "#civicsignalblog/payload/blocks/WebTools/ResourceList";
import { MAIN } from "#civicsignalblog/payload/lib/data/common/applications";
import pages from "#civicsignalblog/payload/utils/createPagesCollection";

const Pages = pages({
  pageSlug: `${MAIN}-pages`,
  label: "Pages",
  group: "Publication",
  defaultColumns: ["fullTitle", "updatedAt"],
  blocks: [PageHeader, ResourceList],
  access: {
    read: canRead,
  },
});

export default Pages;
