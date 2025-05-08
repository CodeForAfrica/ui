import site from "@/roboshield/utils/site";
import { Media, Page, SettingsSite } from "@/root/payload-types";
import { NextSeoProps } from "next-seo";

type OpenGraphMedia = {
  url: string;
  width?: number | null;
  height?: number | null;
  alt?: string;
  type?: string;
  secureUrl?: string;
};

type RichTextProps = {
  [k: string]: unknown;
}[];

function stringifyDescription(description: RichTextProps) {
  if (!Array.isArray(description)) {
    return "";
  }
  return description.reduce((result, item) => {
    if (item.text) {
      // eslint-disable-next-line no-param-reassign
      result += item.text;
    }

    if (Array.isArray(item.children)) {
      // eslint-disable-next-line no-param-reassign
      result += stringifyDescription(item.children);
    }
    return result;
  }, "");
}

function mediaToImage(
  stringOrMediaImage: string | Media | null | undefined,
  title: string | null,
): OpenGraphMedia | null {
  const media = stringOrMediaImage as Media;

  if (!media?.url) {
    return null;
  }
  const { height, mimeType: type, url, width } = media;
  const image: OpenGraphMedia = {
    height,
    url,
    width,
  };
  if (type) {
    image.type = type;
  }
  const alt = media.alt || title;
  if (alt) {
    image.alt = alt;
  }
  return image;
}

export default function getPageSeoFromMeta(
  page: Page,
  settings: SettingsSite,
): NextSeoProps {
  const canonical = page.meta?.canonical || site.url.replace(/\/+$/, "");
  const defaultTitle = settings.meta?.title || settings.title || site.name;
  const title = page.meta?.title || page.title || defaultTitle;
  // Dont't use template on homepage
  const titleTemplate = page.slug === "index" ? "%s" : `%s | ${defaultTitle}`;
  const description =
    page.meta?.description ||
    settings.meta?.description ||
    stringifyDescription(settings.description?.root?.children);
  const openGraph: Record<string, any> = {
    type: "website",
    siteName: defaultTitle,
  };
  const image =
    mediaToImage(page.meta?.image, title) ||
    mediaToImage(settings.meta?.image, title);
  if (image) {
    openGraph.images = [image];
  }
  const seo = {
    title,
    titleTemplate,
    defaultTitle,
    description,
    canonical,
    openGraph,
  };

  return Object.fromEntries(Object.entries(seo).filter(([, val]) => val));
}
