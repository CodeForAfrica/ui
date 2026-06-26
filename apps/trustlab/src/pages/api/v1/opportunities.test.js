import querystring from "node:querystring";

import handler from "./opportunities.page";

import api from "@/trustlab/lib/payload";
import { setSearchParam } from "@/trustlab/utils/queryParams";

jest.mock("@/trustlab/lib/payload", () => ({
  getCollection: jest.fn(),
  findPage: jest.fn(),
}));

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("/api/v1/opportunities", () => {
  beforeEach(() => {
    api.getCollection.mockResolvedValue({
      docs: [],
      page: 1,
      totalPages: 1,
      totalDocs: 0,
      hasNextPage: false,
      hasPrevPage: false,
    });
    api.findPage.mockResolvedValue({ docs: [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("round-trips comma values and repeated filters through the query string", async () => {
    // Client serializes filters exactly as useOpportunities does.
    const searchParams = new URLSearchParams();
    setSearchParam(searchParams, "location", [
      "Nairobi, Kenya",
      "Lagos, Nigeria",
    ]);
    setSearchParam(searchParams, "opportunity", [
      "opportunity-1",
      "opportunity-2",
    ]);

    // querystring mirrors Next's pages-router parsing of req.query: repeated
    // keys become arrays, single keys stay strings. This is the boundary the
    // comma-in-value bug used to break.
    const query = querystring.parse(searchParams.toString());
    expect(query.location).toEqual(["Nairobi, Kenya", "Lagos, Nigeria"]);
    expect(query.opportunity).toEqual(["opportunity-1", "opportunity-2"]);

    const res = createResponse();
    await handler({ method: "GET", query }, res);

    const { where } = api.getCollection.mock.calls[0][1];
    expect(where.and).toEqual(
      expect.arrayContaining([
        { id: { in: ["opportunity-1", "opportunity-2"] } },
        { location: { in: ["Nairobi, Kenya", "Lagos, Nigeria"] } },
      ]),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
