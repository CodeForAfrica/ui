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
    helpdesk.link = { href: linkHref ?? null, label: linkLabel ?? null };
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

  const { partners } = blocks.find(
    (block) => block.slug === "block-partners"
  ) || { partners: [] };
  const hero = blocks.find((block) => block.slug === "hero") || {};

  const heroSlides = hero?.slides?.map((slide) => {
    const { background, links, ...other } = slide;
    const formattedLinks = links.map((link) => {
      const { color, icon, label: content } = link;
      return {
        color,
        content,
        icon: { src: icon.url },
      };
    });

    return {
      background: {
        blendMode: background.blendMode.join(","),
        color: background.color,
        src: background.image.url,
      },
      links: formattedLinks,
      ...other,
    };
  });

  hero.slides = heroSlides || null;

  return {
    props: {
      blocks: [
        {
          slug: "switch",
          startLabel: "People",
          endLabel: "Organisations",
        },
        hero,
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
