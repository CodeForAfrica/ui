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
      case "resources":
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

  // heroSlides
  const heroSlides = blocks
    .filter((block) => block.blockType === "hero")
    .map((block) => {
      const { title, background, links, ...other } = block;

      const titleText = title.content[0].children[0].text;
      const backGroundImageURL = background.src.url;

      const formattedLinks = links.map((link) => {
        const { content, color, icon } = link.button;
        // TODO: Handle reference Link handling
        const formattedLink = {
          content,
          color,
          icon: { src: icon.url },
        };
        return formattedLink;
      });

      return {
        title: {
          color: title.color,
          content: titleText,
        },
        background: {
          blendMode: background.blendMode,
          color: background.color,
          src: backGroundImageURL,
        },
        links: formattedLinks,
        ...other,
      };
    });

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
          slides: heroSlides,
        },
        spotlight,
        ecosystem,
        {
          slug: "focal-countries",
          ...fc,
        },
        {
          slug: "resources",
          title: "Our Resources",
          resources: [
            {
              background: {
                color: "#4D2137",
                src: "/images/resources-tools.png",
              },
              icon: {
                color: "#F7CE46",
                src: "/icons/Type=database, Size=64, Color=CurrentColor.svg",
              },
              link: {
                content: "Browse tools",
              },
              name: "Tools",
              value: "54,000",
            },
            {
              background: {
                color: "#CC6F58",
                src: "/images/resources-people.png",
              },
              icon: {
                color: "#F29D88",
                src: "/icons/Type=paperclip, Size=64, Color=CurrentColor.svg",
              },
              link: {
                content: "Browse people",
              },
              name: "People",
              value: "54,000",
            },
            {
              background: {
                color: "#699968",
                src: "/images/resources-organisations.png",
              },
              icon: {
                color: "#AAD4A9",
                src: "/icons/Type=users, Size=64, Color=CurrentColor.svg",
              },
              link: {
                content: "Browse organisations",
              },
              name: "Organisations",
              value: "54,000",
            },
            {
              background: {
                color: "#6C5B6D",
                src: "/images/resources-data.png",
              },
              icon: {
                color: "#A790A9",
                src: "/icons/Type=database, Size=64, Color=CurrentColor.svg",
              },
              link: {
                content: "Browse database",
              },
              name: "Data",
              value: "54,000",
            },
          ],
        },
        {
          slug: "helpdesk",
          description: `
          <p>
            Need help connecting with experts?<br />
            We can help you find specialists or resources to improve the impact of your democracy project.
          </p>
          `,
          image: {
            src: "/images/helpdesk.svg",
          },
          link: {
            content: "Submit request",
          },
          title: "Democracy Support Helpdesk",
        },
        {
          slug: "partners",
          title: "Partners",
          consortium: {
            description:
              "A consortium of African and European organisations is supporting the implementation of the Fund. Each organisation brings in specific expertise to the initiative, ranging from grassroots digital activism, to civic technology development and data science, policy analysis and democracy support. The consortium can ensure a presence across the African continent and leverage existing networks and partnerships.",
            partners: [
              {
                name: "Africtivistes",
                logo: {
                  src: "/images/africtivistes.svg",
                },
                link: {
                  href: "https://www.africtivistes.com",
                },
              },
              {
                name: "Code for Africa",
                logo: {
                  src: "/images/codeforafrica.svg",
                },
                link: {
                  href: "https://codeforafrica.org",
                },
              },
              {
                name: "Democracy Works Foundation",
                logo: {
                  src: "/images/dwf.jpg",
                },
                link: {
                  href: "https://www.democracyworks.org.za",
                },
              },
              {
                name: "ECDPM",
                logo: {
                  src: "/images/ecdpm.jpg",
                },
                link: {
                  href: "https://ecdpm.org",
                },
              },
              {
                name: "EPD",
                logo: {
                  src: "/images/epd.jpg",
                },
                link: {
                  href: "https://epd.eu",
                },
              },
              {
                name: "Goree Institute",
                logo: {
                  src: "/images/goree.jpg",
                },
                link: {
                  href: "https://goreeinstitut.org/",
                },
              },
            ],
          },
          project: {
            description:
              "The Fund was first conceived in the context of the Charter Project Africa, a pan-African project focused on the commitments contained in the African Charter for Democracy, Elections and Governance (ACDEG). The project, implemented by the six organisations mentioned above, promotes the usage of civic technology to amplify citizen voices. It is co-funded by the European Union.",
            partners: [
              {
                name: "The Charter Project Africa",
                logo: {
                  src: "/images/the-charter-project-africa_brandguide_guidedemarque-2-2.jpg",
                },
                link: {
                  href: "https://codeforafrica.org",
                },
              },
              {
                name: "The European Union",
                logo: {
                  src: "/images/eu.png",
                },
                link: {
                  href: "https://europa.eu",
                },
              },
            ],
          },
          fund: {
            description:
              "The Fund further integrates the African Union Civic Tech Fund, hosted by the African Union. Both the Charter Project Africa and the African Union Civic Tech Fund share common goals and, in particular, both emphasise the use of civic technology to improve inclusive public decision-making and strengthen democratic governance throughout Africa. The African Union Civic Tech Fund is financially supported by the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), and managed by the European Partnership for Democracy.",
            partners: [
              {
                name: "African Union Civic Tech Fund",
                logo: {
                  src: "/images/african-union-civic-tech-fund.jpg",
                },
                link: {
                  href: "https://civictechfund.africa/auctf/",
                },
              },
              {
                name: "African Union",
                logo: {
                  src: "/images/african-union.jpg",
                },
                link: {
                  href: "https://au.int",
                },
              },
              {
                name: "GIZ",
                logo: {
                  src: "/images/giz.jpg",
                },
                link: {
                  href: "https://www.giz.de",
                },
              },
            ],
          },
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
