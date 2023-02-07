import site from "@/charterafrica/utils/site";

const isSeoDisabled =
  process.env.NEXT_PUBLIC_SEO_DISABLED?.trim()?.toLowerCase() === "true";
const config = {
  // Disable indexing while in development
  dangerouslySetAllPagesToNoFollow: isSeoDisabled,
  dangerouslySetAllPagesToNoIndex: isSeoDisabled,
  openGraph: {
    type: "website",
    locale: "en",
    url: site.environmentUrl,
    site_name: site.name,
    images: [
      {
        url: `${site.environmentUrl}image.jpg`,
        width: 1170,
        height: 622,
        alt: site.name,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@charter_africa",
    site: "@charter_africa",
    cardType: "summary_large_image",
  },
};

export default config;
