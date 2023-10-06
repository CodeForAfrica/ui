import PostsTab from "./PostsTab";

const Publications = {
  slug: "publications",
  label: "Publications",
  access: {
    read: () => true,
  },
  admin: {
    group: "Website",
  },
  fields: [
    {
      type: "tabs",
      tabs: [PostsTab],
    },
  ],
};

export default Publications;
