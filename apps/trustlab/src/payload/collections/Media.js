import path from "path";
import { fileURLToPath } from "url";

import { createdBy } from "@commons-ui/payload";

import { canManageContent } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import { hideAPIURL, slugify } from "@/trustlab/payload/utils";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const Media = {
  slug: "media",
  access: {
    read: anyone,
    create: ({ req: { user } }) => canManageContent(user),
    update: ({ req: { user } }) => canManageContent(user),
    delete: ({ req: { user } }) => canManageContent(user),
  },
  admin: {
    group: "Publication",
    hideAPIURL,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    createdBy(),
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "square",
        width: 500,
        height: 500,
      },
      {
        name: "small",
        width: 600,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 1400,
      },
      {
        name: "xlarge",
        width: 1920,
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        crop: "center",
      },
    ],
    safeFileNames: true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.filename) {
          const ext = path.extname(data.filename);
          const baseName = path.basename(data.filename, ext);
          const name = slugify(baseName) + ext;
          return {
            ...data,
            filename: name,
          };
        }
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        const { pathname } = new URL(doc?.url);
        return {
          ...doc,
          url: pathname,
          src: pathname,
        };
      },
    ],
  },
};

export default Media;
