import React from "react";

import Ecosystem from "@/charterafrica/components/Ecosystem";
import FocalCountries from "@/charterafrica/components/FocalCountries";
import Helpdesk from "@/charterafrica/components/Helpdesk";
import Hero from "@/charterafrica/components/Hero";
import Partners from "@/charterafrica/components/Partners";
import Resources from "@/charterafrica/components/Resources";
import Spotlight from "@/charterafrica/components/Spotlight";
import { payload } from "@/charterafrica/lib";

function Index({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "ecosystem":
        return <Ecosystem {...block} key={block.slug} />;
      case "focal-countries":
        return <FocalCountries {...block} key={block.slug} />;
      case "helpdesk":
        return <Helpdesk {...block} key={block.slug} />;
      case "hero":
        return <Hero {...block} key={block.slug} />;
      case "partners":
        return <Partners {...block} key={block.slug} />;
      case "our-resources":
        return <Resources {...block} key={block.slug} />;
      case "spotlight":
        return <Spotlight {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getStaticProps({ defaultLocale, locale, locales }) {
  const { menus } = await payload.findGlobal("navigation", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { languages } = await payload.findGlobal("settings", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const fc = await payload.findGlobal("focal-countries", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const helpdesk = await payload.findGlobal("helpdesk", {
    locale,
    fallbackLocale: defaultLocale,
  });
  // TODO(kilemens): Move these to lib/data for any and all page data processing
  if (helpdesk) {
    helpdesk.slug = "helpdesk";
    const { alt: imageAlt, url: imageSrc } = helpdesk.image;
    helpdesk.image = { alt: imageAlt, src: imageSrc };
    const { href: linkHref, label: linkLabel } = helpdesk.link;
    helpdesk.link = { href: linkHref, label: linkLabel };
  }

  const { docs: pages } = await payload.findPage("index", {
    locale,
    fallbackLocale: defaultLocale,
  });

  if (!pages?.length) {
    return { notFound: true };
  }

  const blocks =
    pages[0].blocks?.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    })) ?? [];

  const spotlight = blocks.find((block) => block.slug === "spotlight") || {};

  const spotlightItems = spotlight?.items?.map((item) => {
    const { item: itemData, ...rest } = item;
    return {
      ...rest,
      item: {
        ...itemData,
        image: {
          src: itemData.image.url,
          alt: itemData.image.alt,
        },
        date: new Date(itemData.date).toLocaleDateString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        link: {
          href: itemData?.link.href || "#", // TODO: handle reference links
        },
      },
    };
  });

  spotlight.items = spotlightItems || null;

  const ecosystem = blocks.find((block) => block.slug === "ecosystem") || null;
  const ourResources =
    blocks.find((block) => block.slug === "our-resources") || null;

  const { partnerGroups } = await payload.findGlobal("Partners", {
    locale,
    fallbackLocale: defaultLocale,
  });

  const partners = partnerGroups.map((partner) => ({
    partners: partner.links,
    ...partner,
  }));

  return {
    props: {
      blocks: [
        {
          slug: "switch",
          startLabel: "People",
          endLabel: "Organisations",
        },
        {
          slug: "hero",
          slides: [
            {
              id: 1,
              title: {
                color: "common.white",
                content:
                  "Find Africa's best <br><i>digital democracy</i> tools",
              },
              subheading: {
                color: "#fff",
                content: "Easy to use resources for democracy activists",
              },
              background: {
                blendMode: "multiply, luminosity",
                color: "#4E2037",
                src: "/images/hero-slide-1.jpg",
              },
              links: [
                {
                  color: "secondary",
                  content: "Explore software",
                  icon: {
                    src: "/icons/Type=folder, Size=16, Color=Neutral900.svg",
                  },
                },
                {
                  color: "secondary",
                  content: "Browse database",
                  icon: {
                    src: "/icons/Type=database, Size=16, Color=Neutral900.svg",
                  },
                },
              ],
            },
            {
              id: 2,
              title: {
                color: "#3E202C",
                content: "Find African allies to <br>turbocharge your project",
              },
              subheading: {
                color: "#3E202C",
                content: "Databases of Africa's leading democracy changemakers",
              },
              background: {
                blendMode: "hard-light, normal",
                color: "#F7CE46",
                src: "/images/hero-slide-2.jpg",
              },
              links: [
                {
                  color: "primary",
                  content: "Find experts",
                  icon: {
                    src: "/icons/Type=users, Size=16, Color=White.svg",
                  },
                },
                {
                  color: "primary",
                  content: "Explore networks",
                  icon: {
                    src: "/icons/Type=globe, Size=16, Color=White.svg",
                  },
                },
              ],
            },
            {
              id: 3,
              title: {
                color: "#3E202C",
                content:
                  "Get in-depth actionable <br>knowledge to strengthen democracy",
              },
              subheading: {
                color: "#3E202C",
                content:
                  "Expert analysis and hands-on training for democratic watchdogs",
              },
              background: {
                blendMode: "overlay, multiply",
                color: "#AAD4A9",
                src: "/images/hero-slide-3.jpg",
              },
              links: [
                {
                  color: "primary",
                  content: "Access reserach",
                  icon: {
                    src: "/icons/Type=file, Size=16, Color=White.svg",
                  },
                },
                {
                  color: "primary",
                  content: "Get training",
                  icon: {
                    src: "/icons/Type=book-open, Size=16, Color=White.svg",
                  },
                },
              ],
            },
            {
              id: 4,
              title: {
                color: "#FFF",
                content:
                  "Find resources and support <br>to build your initiative",
              },
              subheading: {
                color: "#FFF",
                content:
                  "Register for democracy grants, fellowships and events",
              },
              background: {
                blendMode: "multiply",
                color: "#F29D88",
                src: "/images/hero-slide-4.jpg",
              },
              links: [
                {
                  color: "primary",
                  content: "Get opportunities",
                  icon: {
                    src: "/icons/Type=briefcase, Size=16, Color=White.svg",
                  },
                },
                {
                  color: "primary",
                  content: "Join community",
                  icon: {
                    src: "/icons/Type=users, Size=16, Color=White.svg",
                  },
                },
              ],
            },
          ],
        },
        spotlight,
        ecosystem,
        {
          slug: "focal-countries",
          ...fc,
        },
        ourResources,
        helpdesk,
        {
          slug: "partners",
          title: "Partners",
          partners,
        },
      ],
      footer: {
        contact: {
          email: {
            href: "mailto:info@charter.africa",
            content: "info@charter.africa",
          },
        },
        copyright: "© 2022 European Partnership for Democracy (CC BY-NC 2.0)",
        links: [
          {
            href: "/",
            content: "Privacy Policy",
          },
          {
            href: "/",
            content: "Imprint",
          },
        ],
        logo: {
          alt: "EU",
          src: "/images/eu.png",
        },
        projectDescription: "Website designed and built by Code for Africa",
        siteDescription:
          "This website was created and maintained with the financial support of the European Union. Its contents are the sole responsibility of the European Partnership for Democracy, Africtivistes, Code for Africa, ECPDM, and Goree Institute and do not necessarily reflect the views of the European Union.",
      },
      navbar: {
        languages: languages ?? null,
        logo: {
          alt: "Charter Africa",
          src: "/images/charter-logo.svg",
          href: "/",
          priority: true,
        },
        menus: menus ?? null,
      },
      locale,
      locales,
      seo: {
        title: "charter.AFRICA",
      },
    },
  };
}

export default Index;
