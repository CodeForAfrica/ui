import { useState, useEffect } from 'react';

export default function useFetchArticles(url) {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      setArticles(json);
    }
    fetchUrl();
  }, [url]);

  return [articles];
}
