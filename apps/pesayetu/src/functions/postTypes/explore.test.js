import getPostTypeStaticProps from "@/pesayetu/functions/postTypes/getPostTypeStaticProps";
import { fetchProfile, fetchProfileGeography } from "@/pesayetu/lib/hurumap";
import { getStaticProps } from "@/pesayetu/pages/explore/[[...slug]]";

jest.mock("@/pesayetu/components/ExplorePage", () => jest.fn());
jest.mock("@/pesayetu/components/HURUmap/Tutorial", () => jest.fn());
jest.mock("@/pesayetu/components/Page", () => jest.fn());
jest.mock("@/pesayetu/functions/formatBlocksForSections", () =>
  jest.fn().mockResolvedValue({}),
);
jest.mock("@/pesayetu/functions/postTypes/getPostTypeStaticProps", () =>
  jest.fn(),
);
jest.mock("@/pesayetu/lib/hurumap", () => ({
  fetchProfile: jest.fn(),
  fetchProfileGeography: jest.fn(),
}));

describe("Explore static props", () => {
  const context = { params: { slug: ["ke"] }, preview: false };
  const revalidate = 300;

  beforeEach(() => {
    jest.clearAllMocks();
    getPostTypeStaticProps.mockResolvedValue({
      props: { post: { blocks: [] } },
      revalidate,
    });
    fetchProfile.mockResolvedValue({
      locations: [{ code: "ke" }],
      preferredChildren: {},
    });
    fetchProfileGeography.mockResolvedValue({ code: "ke" });
  });

  it("generates Kenya with the configured revalidation interval", async () => {
    await expect(getStaticProps(context)).resolves.toMatchObject({
      props: { profile: [{ code: "ke" }] },
      revalidate,
    });
  });

  it("retries missing CMS content instead of permanently caching a 404", async () => {
    getPostTypeStaticProps.mockResolvedValue({ notFound: true, revalidate });

    await expect(getStaticProps(context)).resolves.toEqual({
      notFound: true,
      revalidate,
    });
    expect(fetchProfile).not.toHaveBeenCalled();
  });

  it("retries an absent location and can recover when the profile includes it again", async () => {
    fetchProfile.mockResolvedValueOnce({ locations: [{ code: "47" }] });

    await expect(getStaticProps(context)).resolves.toEqual({
      notFound: true,
      revalidate,
    });
    expect(fetchProfileGeography).not.toHaveBeenCalled();
    await expect(getStaticProps(context)).resolves.toMatchObject({
      props: { profile: [{ code: "ke" }] },
    });
  });

  it("does not convert a HURUmap outage into a 404", async () => {
    const failure = new Error("HURUmap unavailable");
    fetchProfile.mockRejectedValueOnce(failure);

    await expect(getStaticProps(context)).rejects.toBe(failure);
  });
});
