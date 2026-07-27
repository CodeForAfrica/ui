import { fetchProfile } from "@/pesayetu/lib/hurumap";

describe("fetchProfile", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  it("throws when HURUmap responds with an HTTP error", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: jest.fn(),
    });

    await expect(fetchProfile()).rejects.toThrow(
      "failed with status 503 Service Unavailable",
    );
  });

  it("throws when HURUmap returns an empty location configuration", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        configuration: {
          featured_locations: [],
        },
      }),
    });

    await expect(fetchProfile()).rejects.toThrow(
      "Invalid HURUmap profile response",
    );
  });

  it("normalizes location codes from a valid profile", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        configuration: {
          featured_locations: [
            {
              code: "KE",
              level: "country",
              name: "Kenya",
            },
          ],
          preferred_children: {
            country: "county",
          },
        },
      }),
    });

    await expect(fetchProfile()).resolves.toEqual({
      locations: [
        {
          code: "ke",
          level: "country",
          name: "Kenya",
        },
      ],
      preferredChildren: {
        country: "county",
      },
    });
  });
});
