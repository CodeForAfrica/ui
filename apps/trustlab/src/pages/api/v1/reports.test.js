import querystring from "node:querystring";

import handler from "./reports.page";

import { setSearchParam } from "@/trustlab/utils/queryParams";
import { getReports } from "@/trustlab/utils/reports";

jest.mock("@/trustlab/lib/payload", () => ({}));
jest.mock("@/trustlab/utils/reports", () => ({
  getReports: jest.fn(),
}));

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("/api/v1/reports", () => {
  beforeEach(() => {
    getReports.mockResolvedValue({
      reports: [],
      pagination: { page: 1, count: 1 },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("builds filters from repeated query params", async () => {
    const res = createResponse();

    await handler(
      {
        method: "GET",
        query: {
          report: ["report-one", "report-two"],
          year: ["2025", "2026"],
          month: ["1", "2"],
        },
      },
      res,
    );

    const options = getReports.mock.calls[0][1];
    expect(options.where.and[0]).toEqual({
      slug: { in: ["report-one", "report-two"] },
    });
    expect(options.where.and[1].or).toHaveLength(4);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("coerces a duplicated single-valued param to its last value", async () => {
    const res = createResponse();

    await handler(
      {
        method: "GET",
        query: { reportsType: ["briefing", "playbook"] },
      },
      res,
    );

    const { where } = getReports.mock.calls[0][1];
    expect(where.and[0]).toEqual({ reportType: { equals: "playbook" } });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("round-trips comma values and repeated filters through the query string", async () => {
    // Client serializes filters exactly as useReports does.
    const searchParams = new URLSearchParams();
    setSearchParam(searchParams, "report", ["report, one", "report-two"]);
    setSearchParam(searchParams, "year", ["2025", "2026"]);

    // querystring mirrors Next's pages-router parsing of req.query: repeated
    // keys become arrays, single keys stay strings. This is the boundary the
    // comma-in-value bug used to break.
    const query = querystring.parse(searchParams.toString());
    expect(query.report).toEqual(["report, one", "report-two"]);
    expect(query.year).toEqual(["2025", "2026"]);

    const res = createResponse();
    await handler({ method: "GET", query }, res);

    const options = getReports.mock.calls[0][1];
    expect(options.where.and[0]).toEqual({
      slug: { in: ["report, one", "report-two"] },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
