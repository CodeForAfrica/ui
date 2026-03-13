import { renderHook } from "@testing-library/react";
import useSWR from "swr";

import useBarazas from "./useBarazas";

jest.mock("swr");

describe("useBarazas", () => {
  const mockBarazas = [
    { id: "1", title: "Baraza 1" },
    { id: "2", title: "Baraza 2" },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns initial barazas when skip is true", () => {
    useSWR.mockReturnValue({ data: undefined });

    const { result } = renderHook(() =>
      useBarazas(1, {}, mockBarazas, 1, true),
    );

    expect(result.current.barazas).toEqual(mockBarazas);
    expect(result.current.pagination).toEqual({ page: 1, count: 1 });
    expect(useSWR).toHaveBeenCalledWith(
      null,
      expect.any(Function),
      expect.any(Object),
    );
  });

  it("fetches barazas when skip is false", () => {
    const fetchedBarazas = [{ id: "3", title: "Fetched Baraza" }];
    useSWR.mockReturnValue({
      data: { docs: fetchedBarazas, page: 1, totalPages: 2 },
    });

    const { result } = renderHook(() =>
      useBarazas(1, { limit: 10 }, [], 1, false),
    );

    expect(result.current.barazas).toEqual(fetchedBarazas);
    expect(result.current.pagination).toEqual({ page: 1, count: 2 });
    expect(useSWR).toHaveBeenCalledWith(
      expect.stringContaining("/api/barazas"),
      expect.any(Function),
      expect.any(Object),
    );
  });

  it("includes filter params in the SWR key", () => {
    useSWR.mockReturnValue({ data: { docs: [], page: 1, totalPages: 1 } });

    const params = {
      limit: 10,
      barazasType: "community",
      location: "Nairobi",
      search: "test",
    };

    renderHook(() => useBarazas(2, params, [], 1, false));

    const swrKey = useSWR.mock.calls[0][0];
    expect(swrKey).toContain("page=2");
    expect(swrKey).toContain("limit=10");
    expect(swrKey).toContain("type=community");
    expect(swrKey).toContain("location=Nairobi");
    expect(swrKey).toContain("search=test");
  });

  it("falls back to initial values when data is undefined", () => {
    useSWR.mockReturnValue({ data: undefined });

    const { result } = renderHook(() =>
      useBarazas(1, {}, mockBarazas, 1, false),
    );

    expect(result.current.barazas).toEqual(mockBarazas);
    expect(result.current.pagination).toEqual({ page: 1, count: 1 });
  });
});
