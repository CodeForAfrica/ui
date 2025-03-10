const Media = {
  slug: "media",
  admin: {
    defaultColumns: ["alt", "updatedAt"],
    enableRichTextLink: false,
    group: "Publication",
    useAsTitle: "alt",
  },
  access: {
    read: () => true, // Everyone can read Media
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
  },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => ({
        ...doc,
        /*
        Since we are setting PAYLOAD_PUBLIC_APP_URL=http://localhost:3000 at build time, generating static pages(404,500) ends up with image urls with `http://localhost:3000/media/cfalogobw.svg`.
        In this proposal, we are just returning pathnames without hostname since our next js apps and payload are served from the same instance.
        */
        src: new URL(doc.url).pathname,
        url: new URL(doc.url).pathname,
      }),
    ],
  },
};

export default Media;
