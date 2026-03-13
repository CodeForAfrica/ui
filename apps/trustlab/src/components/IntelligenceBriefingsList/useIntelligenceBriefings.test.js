import { renderHook, waitFor } from "@testing-library/react";

import useIntelligenceBriefings from "./useIntelligenceBriefings";

describe("useIntelligenceBriefings", () => {
  const mockBriefings = [
    { id: "1", title: "Briefing 1" },
    { id: "2", title: "Briefing 2" },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns initial briefings when skip is true", () => {
    const { result } = renderHook(() =>
      useIntelligenceBriefings(1, {}, mockBriefings, 1, true),
    );

    expect(result.current.briefings).toEqual(mockBriefings);
    expect(result.current.pagination).toEqual({ page: 1, count: 1 });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("fetches briefings when skip is false", async () => {
    const fetchedBriefings = [{ id: "3", title: "Fetched Briefing" }];
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          docs: fetchedBriefings,
          page: 1,
          totalPages: 2,
        }),
    });

    const { result } = renderHook(() =>
      useIntelligenceBriefings(1, { limit: 10 }, [], 1, false),
    );

    await waitFor(() => {
      expect(result.current.briefings).toEqual(fetchedBriefings);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/intelligence-briefings"),
    );
  });

  it("includes filter params in fetch request", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          docs: [],
          page: 1,
          totalPages: 1,
        }),
    });

    const params = {
      limit: 10,
      briefingsType: "security",
      search: "test",
    };

    renderHook(() => useIntelligenceBriefings(2, params, [], 1, false));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const fetchCall = global.fetch.mock.calls[0][0];
    expect(fetchCall).toContain("page=2");
    expect(fetchCall).toContain("limit=10");
    expect(fetchCall).toContain("type=security");
    expect(fetchCall).toContain("search=test");
  });

  it("handles fetch errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useIntelligenceBriefings(1, {}, mockBriefings, 1, false),
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch intelligence briefings:",
        expect.any(Error),
      );
    });

    expect(result.current.briefings).toEqual(mockBriefings);

    consoleSpy.mockRestore();
  });
});
