import canRead from "#civicsignalblog/payload/access/applications/main";
import PageHeader from "#civicsignalblog/payload/blocks/PageHeader";
import { MAIN } from "#civicsignalblog/payload/lib/data/common/applications";
import pages from "#civicsignalblog/payload/utils/createPagesCollection";

const Pages = pages({
  pageSlug: `${MAIN}-pages`,
  label: "Pages",
  group: "Publication",
  defaultColumns: ["fullTitle", "updatedAt"],
  blocks: [PageHeader],
  access: {
    read: canRead,
  },
});

export default Pages;
