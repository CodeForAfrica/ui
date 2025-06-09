import site from "@/trustlab/utils/site";

const isSeoDisabled =
  process.env.NEXT_PUBLIC_SEO_DISABLED?.trim()?.toLowerCase() === "true";

const config = {
  // Disable indexing while in development
  dangerouslySetAllPagesToNoFollow: isSeoDisabled,
  dangerouslySetAllPagesToNoIndex: isSeoDisabled,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    site_name: site.name,
    images: [site.image],
  },
  twitter: {
    handle: "@Code4Africa",
    site: "@Code4Africa",
    cardType: "summary_large_image",
  },
};

export default config;
