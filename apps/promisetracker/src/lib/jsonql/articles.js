import { equalsIgnoreCase, slugify } from "@/promisetracker/utils";

function jsonQL(articles) {
  const allArticles = articles.map((article) => {
    const slug = article.slug || slugify(article.title);
    const href = article.href || article.link || `/analysis/articles/${slug}`;

    return { ...article, href, slug };
  });

  const api = {
    getArticles({ limit } = {}) {
      return allArticles.slice(0, limit);
    },
    getArticle({ slug, ...others } = {}) {
      const filteredArticles = api.getArticles(others);
      if (slug) {
        return filteredArticles.find((a) => equalsIgnoreCase(a.slug, slug));
      }
      const [article] = filteredArticles;
      return article;
    },
  };

  return api;
}

export default jsonQL;
