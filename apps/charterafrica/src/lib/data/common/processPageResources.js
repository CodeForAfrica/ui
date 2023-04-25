const allTags = [
  "Monitoring",
  "Democratic culture",
  "Public Accountability",
  "Empowerment of Women",
  "Rule of law",
  "Score",
  "Anti-corruption",
  "Civic space",
  "Polling Technologies",
  "Dialogue",
  "Parliament",
  "Political pluralism",
  "Electoral Cycles",
  "Civic values education",
  "Decentralisation",
  "Representation of marginalized social groups",
  "Multi-level democratic governance",
  "Women representation",
  "parliament",
  "Economic and corporate governance",
  "Election boards",
  "freedom of assembly",
  "Separation of powers",
  "Fight against all discriminations",
  "Transparency",
  "Women Participation",
  "women",
  "Freedom of opinion",
  "Anti Corruption",
  "Civic Participation",
  "Independent judiciary",
  "Open",
];

// eslint-disable-next-line
  const sampleDataset = {
  count: 30,
  tags: allTags.slice(0, Math.floor(Math.random() * 3) + 2),
  // eslint-disable-next-line
    datasets: Array.from({ length: 10 }, (_, i) => ({
    name: `datasets-name-${i}`,
    notes: "Some notes about the datasets",
    title: `Datasets ${i}`,
    formats: ["csv", "pdf"].slice(0, Math.floor(Math.random() * 2) + 1),
    // eslint-disable-next-line
      documents: Array.from({ length: 10 }, (_, i) => ({
      name: `Document ${i}`,
      format: ["csv", "pdf"][Math.floor(Math.random() * 2)],
      description: "Some description about the document",
      url: "https://www.google.com",
    })),
    type: ["dataset", "document"][Math.floor(Math.random() * 2)],
  })),
};

// eslint-disable-next-line
  export async function processPageData(page, api, context){
  return page;
}
