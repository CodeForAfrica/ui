const baseURL = "https://dc.sourceafrica.net/api/search.json";

function formatDocuments(data) {
  const { documents, ...rest } = data || {};
  const formattedDocuments = documents?.map((document) => {
    const { resources, ...other } = document;
    const { image } = resources.page;

    const imageUrl = image
      .replace("-p{page}", "-p1")
      .replace("-{size}", "-normal");
    return {
      ...other,
      image: imageUrl,
    };
  });

  return {
    ...rest,
    documents: formattedDocuments,
  };
}

export default async function handler(req, res) {
  const { query } = req;
  const encodedQuery = new URLSearchParams(query).toString();
  try {
    const fullURL = `${baseURL}?${encodedQuery}`;
    const response = await fetch(fullURL);
    const data = await response.json();
    const formattedData = formatDocuments(data);
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error });
  }
}
