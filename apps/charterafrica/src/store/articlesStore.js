import { create } from "zustand";

const useArticlesStore = create((set) => ({
  articles: [],
  tags: [],
  filterTag: "",
  filteredArticles: [],

  setArticles: (articles) => set({ articles, filteredArticles: articles }),
  setTags: (tags) => set({ tags }),
  setFilterTag: (filterTag) =>
    set((state) => ({
      filterTag,
      filteredArticles: state.articles.filter((a) =>
        a.tags.map((t) => t.name).includes(filterTag)
      ),
    })),

  getAll: () => useArticlesStore.getState(),

  reset: () =>
    set({ articles: [], tags: [], filterTag: "", filteredArticles: [] }),
}));

export default useArticlesStore;
