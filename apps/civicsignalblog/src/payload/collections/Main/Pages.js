import canRead from "#civicsignalblog/payload/access/applications/main";
import isAdminOrEditor from "#civicsignalblog/payload/access/isAdminOrEditor";
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
    update: isAdminOrEditor,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
});

export default Pages;
