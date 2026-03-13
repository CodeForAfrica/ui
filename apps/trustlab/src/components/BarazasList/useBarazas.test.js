import { renderHook, waitFor } from "@testing-library/react";

import useBarazas from "./useBarazas";

describe("useBarazas", () => {
  const mockBarazas = [
    { id: "1", title: "Baraza 1" },
    { id: "2", title: "Baraza 2" },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns initial barazas when skip is true", () => {
    const { result } = renderHook(() =>
      useBarazas(1, {}, mockBarazas, 1, true),
    );

    expect(result.current.barazas).toEqual(mockBarazas);
    expect(result.current.pagination).toEqual({ page: 1, count: 1 });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("fetches barazas when skip is false", async () => {
    const fetchedBarazas = [{ id: "3", title: "Fetched Baraza" }];
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          docs: fetchedBarazas,
          page: 1,
          totalPages: 2,
        }),
    });

    const { result } = renderHook(() =>
      useBarazas(1, { limit: 10 }, [], 1, false),
    );

    await waitFor(() => {
      expect(result.current.barazas).toEqual(fetchedBarazas);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/barazas"),
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
      barazasType: "community",
      location: "Nairobi",
      search: "test",
    };

    renderHook(() => useBarazas(2, params, [], 1, false));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const fetchCall = global.fetch.mock.calls[0][0];
    expect(fetchCall).toContain("page=2");
    expect(fetchCall).toContain("limit=10");
    expect(fetchCall).toContain("type=community");
    expect(fetchCall).toContain("location=Nairobi");
    expect(fetchCall).toContain("search=test");
  });

  it("handles fetch errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useBarazas(1, {}, mockBarazas, 1, false),
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch barazas:",
        expect.any(Error),
      );
    });

    // Should retain initial values on error
    expect(result.current.barazas).toEqual(mockBarazas);

    consoleSpy.mockRestore();
  });
});
