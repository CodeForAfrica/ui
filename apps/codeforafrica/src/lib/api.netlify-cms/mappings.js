const Project = {
  title: "Projects",
  matchBy: "/projects/",
  fields: ["subtitle"],
};

const IndexPage = {
  title: "Index Page",
  matchBy: "/pages/index.md",
  fields: [
    {
      hero: {
        fields: ["title"],
      },
      "meet-our-team": {
        fields: ["description"],
      },
    },
  ],
};

export default [Project, IndexPage];
