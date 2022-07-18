const Partners = {
  title: "Partners",
  matchBy: "/partners/",
  fields: ["description"],
};

const Badges = {
  title: "Badges",
  matchBy: "/badges/",
  fields: ["description"],
};

const Donors = {
  title: "Donors",
  matchBy: "/donors/",
  fields: [],
};

const GuidingPrinciples = {
  title: "Guiding Principles",
  matchBy: "/guiding_principles/",
  fields: ["description"],
};

const Offices = {
  title: "Offices",
  matchBy: "/offices/",
  fields: ["description"],
};

const OurImpact = {
  title: "Our Impact",
  matchBy: "/our_impact/",
  fields: ["description"],
};

const IndexPage = {
  title: "Index Page",
  matchBy: "/pages/index.md",
  fields: [
    {
      hero: {
        fields: ["title"],
      },
      meet_our_team: {
        fields: ["description"],
      },
    },
  ],
};

export default [
  Partners,
  Badges,
  Donors,
  GuidingPrinciples,
  Offices,
  OurImpact,
  IndexPage,
];
