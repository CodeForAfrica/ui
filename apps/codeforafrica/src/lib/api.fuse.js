import Fuse from "fuse.js";

// https://fusejs.io/api/options.html
const options = {
  // General
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 3,
  // Fuzzy matching
  threshold: 0,
  ignoreLocation: true,
  // Advanced
  useExtendedSearch: true,
};

const membersOptions = {
  ...options,
  // Total weight = 5
  keys: [
    { name: "name", weight: 3 },
    { name: "title", weight: 2 },
    { name: "description", weight: 1 },
  ],
};

const opportunitiesOptions = {
  ...options,
  // Total weight = 10
  keys: [
    { name: "title", weight: 5 },
    { name: "excerpt", weight: 2 },
    { name: "html", weight: 2 },
    { name: "authors.name", weight: 0.5 },
    { name: "authors.bio", weight: 0.5 },
  ],
};

const projectsOptions = {
  ...options,
  keys: [
    // Total weight = 20
    { name: "name", weight: 8 },
    { name: "tagLine", weight: 3 },
    { name: "title", weight: 3 },
    { name: "subtitle", weight: 2.5 },
    { name: "description", weight: 1 },
    { name: "badges.name", weight: 0.5 },
    { name: "partners.list.name", weight: 1 },
    { name: "donors.list.name", weight: 1 },
  ],
};

// stories share structure w/ opportunities
const storiesOptions = opportunitiesOptions;

const api = {
  members: (members) => new Fuse(members, membersOptions),
  opportunities: (opportunities) =>
    new Fuse(opportunities, opportunitiesOptions),
  projects: (projects) => new Fuse(projects, projectsOptions),
  stories: (stories) => new Fuse(stories, storiesOptions),
};

export default api;
