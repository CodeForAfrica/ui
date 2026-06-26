import getOpportunities from "./getOpportunities";

function createApi() {
  return {
    findPage: jest.fn().mockResolvedValue({ docs: [] }),
    getCollection: jest.fn().mockResolvedValue({
      docs: [],
      page: 1,
      totalPages: 1,
      totalDocs: 0,
      hasNextPage: false,
      hasPrevPage: false,
    }),
  };
}

describe("getOpportunities", () => {
  it("builds exact-match filters for repeated query params", async () => {
    const api = createApi();

    await getOpportunities(api, {
      opportunity: ["opportunity-1", "opportunity-2"],
      location: ["Nairobi, Kenya", "Lagos, Nigeria"],
    });

    expect(api.getCollection).toHaveBeenCalledWith(
      "opportunities",
      expect.objectContaining({
        where: {
          and: [
            { id: { in: ["opportunity-1", "opportunity-2"] } },
            { location: { in: ["Nairobi, Kenya", "Lagos, Nigeria"] } },
          ],
        },
      }),
    );
  });

  it("builds date range filters for repeated year and month params", async () => {
    const api = createApi();

    await getOpportunities(api, {
      year: ["2025", "2026"],
      month: ["1", "2"],
    });

    const options = api.getCollection.mock.calls[0][1];
    expect(options.where.and).toHaveLength(1);
    expect(options.where.and[0].or).toHaveLength(4);
    expect(options.where.and[0].or[0]).toHaveProperty("and");
  });

  it("searches title and location", async () => {
    const api = createApi();

    await getOpportunities(api, { search: "nairobi" });

    expect(api.getCollection).toHaveBeenCalledWith(
      "opportunities",
      expect.objectContaining({
        where: {
          and: [
            {
              or: [
                { title: { like: "nairobi" } },
                { location: { like: "nairobi" } },
              ],
            },
          ],
        },
      }),
    );
  });
});
