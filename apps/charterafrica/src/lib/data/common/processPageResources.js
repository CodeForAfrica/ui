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
  count: 17,
  tags: allTags.slice(0, Math.floor(Math.random() * 3) + 2),
  // eslint-disable-next-line
  datasets: Array.from({ length: 17 }, (_, i) => ({
    author: "Author Name",
    name: `datasets-name-${i}`,
    notes:
      "Some notes about the datasets. They notes are very long and can span multiple lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ut aliquam aliquam, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl. Sed euismod, nisl ut aliquam aliquam, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl.",
    title: `Datasets ${i}`,
    formats: ["CSV", "PDF"].slice(0, Math.floor(Math.random() * 2) + 1),
    // eslint-disable-next-line
    documents: Array.from({ length: 10 }, (_, i) => ({
      name: `Document ${i}`,
      format: ["CSV", "PDF"][Math.floor(Math.random() * 2)],
      description: "Some description about the document",
      url: "https://www.google.com",
    })),
    type: ["dataset", "document"][Math.floor(Math.random() * 2)],
    created: "2021-01-01",
    updated: "2021-01-01",
  })),
};

// eslint-disable-next-line
export async function processPageData(page, api, context) {
  const { count, datasets, tags } = sampleDataset;

  const { blocks } = page;
  const pieChartData = [];
  datasets.forEach((dataset) => {
    const { type } = dataset;
    const index = pieChartData.findIndex((item) => item.id === type);
    if (index >= 0) {
      pieChartData[index].value += 1;
    } else {
      pieChartData.push({
        id: type,
        label: type,
        value: 1,
        color: type === "dataset" ? "#D3C5CC" : "#FBE49A",
      });
    }
  });
  blocks.push({
    slug: "datasets-charts",
    data: pieChartData,
  });
  blocks.push({
    slug: "datasets",
    count,
    data: datasets,
    tags,
  });

  return page;
}
