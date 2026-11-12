import handler from "./revalidate.page";

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    revalidate: jest.fn().mockResolvedValue(),
  };
}

function createRequest({ authorization, query = {}, path = "/about" } = {}) {
  return {
    headers: authorization ? { authorization } : {},
    query,
    body: { path },
  };
}

describe("/api/v1/revalidate", () => {
  const { REVALIDATE_SECRET } = process.env;

  afterEach(() => {
    process.env.REVALIDATE_SECRET = REVALIDATE_SECRET;
    jest.clearAllMocks();
  });

  describe("without a configured secret", () => {
    beforeEach(() => {
      delete process.env.REVALIDATE_SECRET;
    });

    it("rejects requests that omit a token", async () => {
      const res = createResponse();

      await handler(createRequest(), res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.revalidate).not.toHaveBeenCalled();
    });

    it("rejects requests when the configured secret is empty", async () => {
      process.env.REVALIDATE_SECRET = "";
      const res = createResponse();

      await handler(createRequest({ query: { secret: "" } }), res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.revalidate).not.toHaveBeenCalled();
    });
  });

  describe("with a configured secret", () => {
    beforeEach(() => {
      process.env.REVALIDATE_SECRET = "test-secret";
    });

    it("rejects requests with the wrong token", async () => {
      const res = createResponse();

      await handler(createRequest({ authorization: "Bearer wrong" }), res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.revalidate).not.toHaveBeenCalled();
    });

    it("rejects requests with a token that only shares a prefix", async () => {
      const res = createResponse();

      await handler(
        createRequest({ authorization: "Bearer test-secret-and-more" }),
        res,
      );

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.revalidate).not.toHaveBeenCalled();
    });

    it("rejects the secret in the query string", async () => {
      const res = createResponse();

      await handler(createRequest({ query: { secret: "test-secret" } }), res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.revalidate).not.toHaveBeenCalled();
    });

    it("revalidates with a bearer token", async () => {
      const res = createResponse();

      await handler(
        createRequest({ authorization: "Bearer test-secret" }),
        res,
      );

      expect(res.revalidate).toHaveBeenCalledWith("/about");
      expect(res.json).toHaveBeenCalledWith({ revalidated: true });
    });

    it("requires a path", async () => {
      const res = createResponse();

      await handler(
        createRequest({ authorization: "Bearer test-secret", path: "" }),
        res,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.revalidate).not.toHaveBeenCalled();
    });
  });
});
