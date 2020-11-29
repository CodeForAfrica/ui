export default {
  title: "PromiseTracker",
  description:
    "The promise tracker is a platform-based promise tracker where citizens can track various promises and services promised by governors, institutions, political parties in their manifestos during the campaigns leading up to the elections and in the post election period.",
  openGraph: {
    type: "website",
    locale: "en_IE",
    site_name: "PromiseTracker",
    images: [
      {
        /* eslint-disable global-require */
        url: require("./src/assets/PT-logo-header-desktop@2x.png"),
        width: 800,
        height: 600,
        alt: "PromiseTracker",
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "minimum-scale=1, initial-scale=1, width=device-width",
    },
  ],
};
