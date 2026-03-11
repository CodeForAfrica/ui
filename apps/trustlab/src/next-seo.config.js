import { site } from "@/trustlab/utils";

const config = {
  // Disable indexing while in development
  dangerouslySetAllPagesToNoFollow: site.seoDisabled,
  dangerouslySetAllPagesToNoIndex: site.seoDisabled,
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
