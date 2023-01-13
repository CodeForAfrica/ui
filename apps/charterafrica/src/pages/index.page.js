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
    switch (block.slug) {
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

  const { docs: homePage } = await payload.findPage("home", "pages", {
    locale,
    fallbackLocale: defaultLocale,
  });

  const { blocks } = homePage[0] ?? {
    blocks: [],
  };

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
        {
          slug: "spotlight",
          title: "Spotlight",
          items: [
            {
              category: "Upcoming Event",
              item: {
                title: "Event name",
                image: {
                  src: "images/events-event-name.jpg",
                },
                topic: "Topic name",
                excerpt:
                  "Lorem ipsum dolor sit amet consectetur adipiscing elit mi, interdum blandit fringilla fus.",
                date: "Date and time",
                link: {
                  href: "/",
                },
              },
            },
            {
              category: "Upcoming Training",
              item: {
                title: "Training name",
                image: {
                  src: "images/trainings-training-name.jpg",
                },
                topic: "Topic name",
                excerpt:
                  "Lorem ipsum dolor sit amet consectetur adipiscing elit mi, interdum blandit fringilla fus.",
                date: "Date and time",
                link: {
                  href: "/",
                },
              },
            },
            {
              category: "Latest Insights",
              item: {
                title: "Latest Insight or research title",
                image: {
                  src: "images/insights-insight-name.jpg",
                },
                topic: "Topic name",
                excerpt:
                  "Lorem ipsum dolor sit amet consectetur adipiscing elit mi, interdum blandit fringilla fus.",
                date: "Date and time",
                link: {
                  href: "/",
                },
              },
            },
            {
              category: "Latest Blog",
              item: {
                title: "Blog Title",
                image: {
                  src: "images/blogs-blog-name.jpg",
                },
                topic: "Topic name",
                excerpt:
                  "Lorem ipsum dolor sit amet consectetur adipiscing elit mi, interdum blandit fringilla fus.",
                date: "Date and time",
                link: {
                  href: "/",
                },
              },
            },
          ],
        },
        {
          slug: "ecosystem",
          items: [
            {
              title: "Tools",
              data: [
                {
                  id: "elections",
                  label: "Elections",
                  value: 26,
                  color: "#4E2037",
                },
                {
                  id: "rule-of-law",
                  label: "Rule of law",
                  value: 4,
                  color: "#F7CE46",
                },
                {
                  id: "civic-space",
                  label: "Civic space",
                  value: 71,
                  color: "#F29D88",
                },
                { id: "media", label: "Media", value: 53, color: "#AAD4A9" },
                {
                  id: "civic-values",
                  label: "Civic values",
                  value: 61,
                  color: "#A88D99",
                },
                {
                  id: "decentralisation",
                  label: "Decentralisation",
                  value: 23,
                  color: "#FBE7A3",
                },
                {
                  id: "multilateralism",
                  label: "Multilateralism",
                  value: 10,
                  color: "#602773",
                },
                {
                  id: "economic-governance",
                  label: "Economic governance",
                  value: 99,
                  color: "#A7F3D0",
                },
                {
                  id: "corporate-governance",
                  label: "Corporate governance",
                  value: 17,
                  color: "#836070",
                },
                {
                  id: "gender-equality",
                  label: "Gender equality",
                  value: 40,
                  color: "#F48E93;",
                },
                {
                  id: "constitutional-changes-government",
                  label: "Constitutional changes of government",
                  value: 38,
                  color: "#947C2A",
                },
              ],
            },
            {
              title: "People",
              data: [
                {
                  id: "experts",
                  label: "Experts",
                  value: 20,
                  color: "#F7CE46",
                },
                {
                  id: "organisations",
                  label: "Organisations",
                  value: 28,
                  color: "#A88D99",
                },
              ],
            },
          ],
        },
        {
          slug: "focal-countries",
          title: "Focal Countries",
          description: `
          <p>The Charter Project is a pan-African initiative by a coalition of watchdog organisations that use civic technologies to strengthen democracy.
          <p>We do this by helping digital activists and democracy changemakers leverage the African Union’s Charter on Democracy, Elections and Governance (ACDEG).
          <p>The project currently supports initiatives in 11 countries. Find out more <a href="/">here</a>
          `,
          countries: [
            {
              code: "BEN",
              name: "Benin",
              position: [9.3217214, 2.3100051],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "ETH",
              name: "Ethiopia",
              position: [9.149175, 40.498867],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "GHA",
              name: "Ghana",
              position: [7.9527706, -1.0307118],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "KEN",
              name: "Kenya",
              position: [0.1768696, 37.9083264],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "NGA",
              name: "Nigeria",
              position: [9.077751, 8.6774567],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "SDN",
              name: "Sudan",
              position: [15.7860696, 30.1995791],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "SEN",
              name: "Senegal",
              position: [14.5001717, -14.4392276],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "TZA",
              name: "Tanzania",
              position: [-6.3728253, 34.8924826],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "ZAF",
              name: "South Africa",
              position: [-28.4792625, 24.6727135],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
            {
              code: "ZWE",
              name: "Zimbabwe",
              position: [-19.0169211, 29.1528018],
              items: [
                { color: "#603549", name: "Tools", total: 350, value: 150 },
                { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
                {
                  color: "#F7CE46",
                  name: "Policy docs",
                  total: 200,
                  value: 60,
                },
                {
                  color: "#F29D88",
                  name: "Fellowships",
                  total: 200,
                  value: 45,
                },
                { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
                { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
              ],
              link: {
                content: "Explore",
              },
            },
          ],
          image: {
            src: "/images/focal-countries.svg",
          },
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
