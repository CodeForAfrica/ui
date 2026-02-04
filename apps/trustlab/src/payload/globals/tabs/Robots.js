export const Robots = {
  slug: "robots",
  label: "Robots.txt",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "robotsTxt",
      label: "robots.txt content",
      type: "textarea",
      required: true,
      admin: { rows: 12 },
      defaultValue: "User-agent: *\nDisallow: /",
    },
  ],
};

export default Robots;
