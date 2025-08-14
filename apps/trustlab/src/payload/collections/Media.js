import path from "path";

import { createdBy } from "@commons-ui/payload";

import { canManageContent } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import { hideAPIURL, slugify } from "@/trustlab/payload/utils";

function slugifyFilename(filename) {
  if (!filename) {
    return filename;
  }
  const ext = path.extname(filename);
  const baseName = path.basename(filename, ext);
  return slugify(baseName) + ext;
}

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
    // Relative to the directory that contains Paylod config
    staticDir: "media",
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
    // Rename files before operation i.e. before even URL is generated, etc.
    beforeOperation: [
      async ({ req, operation, args }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          req.file.name = slugifyFilename(req.file.name);
        }
        return args; // Important: return args to allow the operation to proceed
      },
    ],
    afterRead: [
      ({ doc }) => {
        const { pathname } = new URL(doc?.url);
        return {
          ...doc,
          // Need relative URLs since we're deploying Payload and Next.js
          // in same process
          url: pathname,
          src: pathname,
        };
      },
    ],
  },
};

export default Media;
