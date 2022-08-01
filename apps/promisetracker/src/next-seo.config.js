import site from "@/promisetracker/utils/site";

const config = {
  description:
    "The promise tracker is a platform-based promise tracker where citizens can track various promises and services promised by governors, institutions, political parties in their manifestos during the campaigns leading up to the elections and in the post election period.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.environmentUrl,
    site_name: site.name,
    images: [
      {
        url: `${site.environmentUrl}image.jpg`,
        width: 800,
        height: 600,
        alt: site.name,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@Code4Africa",
    site: "@Code4Africa",
    cardType: "summary_large_image",
  },
};

export default config;
