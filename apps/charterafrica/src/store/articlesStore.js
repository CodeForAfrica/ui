import { create } from "zustand";

const articlesStore = create((set) => ({
  articles: [],
  tags: [],

  setArticles: (articles) => set({ articles, filteredArticles: articles }),
  setTags: (tags) => set({ tags }),
  getAll: () => articlesStore.getState(),
  reset: () => set({ articles: [], tags: [] }),
}));

export default articlesStore;
