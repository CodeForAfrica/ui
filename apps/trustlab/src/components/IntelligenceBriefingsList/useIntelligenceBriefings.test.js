import { renderHook } from "@testing-library/react";
import useSWR from "swr";

import useIntelligenceBriefings from "./useIntelligenceBriefings";

jest.mock("swr");

describe("useIntelligenceBriefings", () => {
  const mockBriefings = [
    { id: "1", title: "Briefing 1" },
    { id: "2", title: "Briefing 2" },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns initial briefings when skip is true", () => {
    useSWR.mockReturnValue({ data: undefined });

    const { result } = renderHook(() =>
      useIntelligenceBriefings(1, {}, mockBriefings, 1, true),
    );

    expect(result.current.briefings).toEqual(mockBriefings);
    expect(result.current.pagination).toEqual({ page: 1, count: 1 });
    expect(useSWR).toHaveBeenCalledWith(
      null,
      expect.any(Function),
      expect.any(Object),
    );
  });

  it("fetches briefings when skip is false", () => {
    const fetchedBriefings = [{ id: "3", title: "Fetched Briefing" }];
    useSWR.mockReturnValue({
      data: { docs: fetchedBriefings, page: 1, totalPages: 2 },
    });

    const { result } = renderHook(() =>
      useIntelligenceBriefings(1, { limit: 10 }, [], 1, false),
    );

    expect(result.current.briefings).toEqual(fetchedBriefings);
    expect(result.current.pagination).toEqual({ page: 1, count: 2 });
    expect(useSWR).toHaveBeenCalledWith(
      expect.stringContaining("/api/intelligence-briefings"),
      expect.any(Function),
      expect.any(Object),
    );
  });

  it("includes filter params in the SWR key", () => {
    useSWR.mockReturnValue({ data: { docs: [], page: 1, totalPages: 1 } });

    const params = {
      limit: 10,
      briefingsType: "security",
      search: "test",
    };

    renderHook(() => useIntelligenceBriefings(2, params, [], 1, false));

    const swrKey = useSWR.mock.calls[0][0];
    expect(swrKey).toContain("page=2");
    expect(swrKey).toContain("limit=10");
    expect(swrKey).toContain("type=security");
    expect(swrKey).toContain("search=test");
  });

  it("falls back to initial values when data is undefined", () => {
    useSWR.mockReturnValue({ data: undefined });

    const { result } = renderHook(() =>
      useIntelligenceBriefings(1, {}, mockBriefings, 1, false),
    );

    expect(result.current.briefings).toEqual(mockBriefings);
    expect(result.current.pagination).toEqual({ page: 1, count: 1 });
  });
});
