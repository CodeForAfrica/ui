const richTextEditor = {
  admin: {
    elements: [
      "h2",
      "h3",
      "h4",
      "link",
      {
        name: "cta",
        plugins: [
          // any plugins that are required by this element go here
        ],
      },
    ],
    leaves: [
      "bold",
      "italic",
      {
        name: "highlight",
        plugins: [],
      },
    ],
    link: {
      // Inject your own fields into the Link element
      fields: [
        {
          name: "rel",
          label: "Rel Attribute",
          type: "select",
          hasMany: true,
          options: ["noopener", "noreferrer", "nofollow"],
        },
      ],
    },
    upload: {
      collections: {
        media: {
          fields: [
            // any fields that you would like to save
            // on an upload element in the `media` collection
          ],
        },
      },
    },
  },
};

export default richTextEditor;
