import site from "@/roboshield/utils/site";

const config = {
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.environmentUrl,
    site_name: site.name,
    images: [
      {
        url: `${site.environmentUrl}image.jpg`,
        width: 1600,
        height: 800,
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
