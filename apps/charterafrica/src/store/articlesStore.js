import { create } from "zustand";

const useArticlesStore = create((set) => ({
  articles: [],
  tags: [],

  setArticles: (articles) => set({ articles, filteredArticles: articles }),
  setTags: (tags) => set({ tags }),
  getAll: () => useArticlesStore.getState(),
  reset: () => set({ articles: [], tags: [] }),
}));

export default useArticlesStore;
