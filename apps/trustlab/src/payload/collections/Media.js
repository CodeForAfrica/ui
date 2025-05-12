import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const Media = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    group: "Media",
    hideAPIURL: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
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
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        const { pathname } = new URL(doc.url);
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
