import querystring from "node:querystring";

import handler from "./index.page";

import api from "@/trustlab/lib/payload";
import { setSearchParam } from "@/trustlab/utils/queryParams";

jest.mock("@/trustlab/lib/payload", () => ({
  getCollection: jest.fn(),
}));

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("/api/v1/playbooks", () => {
  beforeEach(() => {
    api.getCollection.mockResolvedValue({ docs: [], page: 1, totalPages: 1 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("builds a createdAt date filter from repeated year/month params", async () => {
    // Client serializes filters as repeated params; querystring mirrors Next's
    // pages-router parsing (repeated keys -> arrays).
    const searchParams = new URLSearchParams();
    setSearchParam(searchParams, "year", ["2025", "2026"]);
    setSearchParam(searchParams, "month", ["1", "2"]);

    const query = querystring.parse(searchParams.toString());
    expect(query.year).toEqual(["2025", "2026"]);

    const res = createResponse();
    await handler({ method: "GET", query }, res);

    const { where } = api.getCollection.mock.calls[0][1];
    expect(where.and[0].or).toHaveLength(4);
    expect(where.and[0].or[0].and[0]).toHaveProperty("createdAt");
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
