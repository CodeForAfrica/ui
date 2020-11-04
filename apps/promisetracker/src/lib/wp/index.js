import isEmpty from "lodash/isEmpty";

import config from "@/promisetracker/config";

function wp(site) {
  const SITE = site?.length ? `${site.trim().toUpperCase()}_` : "";
  const DEFAULT_LOCALE =
    process.env[`${SITE}DEFAULT_LOCALE`] || config.DEFAULT_LOCALE;
  const WP_DASHBOARD_URL =
    process.env[`${SITE}WP_DASHBOARD_URL`] || config.WP_DASHBOARD_URL;
  const WP_DASHBOARD_API_URL = `${WP_DASHBOARD_URL}/wp-json/wp/v2`;
  const WP_DASHBOARD_ACF_API_URL = `${WP_DASHBOARD_URL}/wp-json/acf/v3`;

  async function getOptions(lang) {
    const res = await fetch(
      `${WP_DASHBOARD_ACF_API_URL}/options/hurumap-site?lang=${lang}`
    );
    const { acf } = res.ok ? await res.json() : {};
    if (!acf) {
      return {};
    }
    let actNow = null;
    if (acf.act_now) {
      actNow = {
        actionLabel: acf.act_now.button_label,
        description: acf.act_now.description,
        link: acf.act_now.link,
        title: acf.act_now.title,
      };
    }
    const promiseStatuses = acf.promiseStatuses || null;
    const footer = {
      about: acf.about || null,
      copyright: acf.copyright || null,
      initiativeLogo: acf.initiative_logo || null,
      legalLinks: acf.legal_links || null,
      organizationLogo: acf.organization_logo || null,
      quickLinks: acf.quick_links,
      socialMedia: acf.social_media,
    };
    // WP sets urls to false if not set
    if (footer.initiativeLogo) {
      footer.initiativeLogo.image = footer.initiativeLogo.image || null;
    }
    if (footer.organizationLogo) {
      footer.organizationLogo.image = footer.organizationLogo.image || null;
    }
    const data = {
      actNow,
      footer,
      navigation: acf.navigation || null,
      partners: acf.partners ? { items: acf.partners } : null,
      promiseStatuses,
      subscribe: acf.subscribe || null,
    };
    return data;
  }
  async function getResourcesBySlug(type, slug, lang, params) {
    const fields = params?.fields ? `&_fields=${params.fields}` : "";
    const embed = params?.embed ? `&_embed=${params.embed}` : "";
    const res = await fetch(
      `${WP_DASHBOARD_API_URL}/${type}?slug=${slug}&lang=${lang}${fields}${embed}`
    );
    const data = res.ok ? await res.json() : [];
    return data;
  }
  async function getResourcesByParentId(type, parent, lang, order, orderBy) {
    const res = await fetch(
      `${WP_DASHBOARD_API_URL}/${type}?parent=${parent}&order=${order}&orderby=${orderBy}&lang=${lang}`
    );
    const data = res.ok ? res.json() : [];
    return data;
  }
  async function getResourceById(type, id, lang, params) {
    const fields = params?.fields ? `&_fields=${params.fields}` : "";
    const embed = params?.embed ? `&_embed=${params.embed}` : "";
    const res = await fetch(
      `${WP_DASHBOARD_API_URL}/${type}/${id}?lang=${lang}${fields}${embed}`
    );
    const data = res.ok ? res.json() : {};
    return data;
  }
  function createPageFrom(resource, options, lang) {
    const { acf } = resource;
    let criteria = null;
    if (acf.criteria?.show) {
      criteria = {
        title: acf.criteria.title || null,
        items: options.promiseStatuses,
      };
    }
    acf.criteria = null;
    const page = {
      ...acf,
      ...resource,
      ...options,
      criteria,
      content: resource.content?.rendered,
      title: resource.title?.rendered,
      languge: lang,
    };
    return page;
  }
  async function getPagesByParentId(parent, lang, order, orderBy) {
    const children = await getResourcesByParentId(
      "pages",
      parent,
      lang,
      order,
      orderBy
    );
    const options = children.length && (await getOptions(lang));
    const data = children.map((child) => createPageFrom(child, options, lang));
    return data;
  }
  async function getPagesByParentSlug(slug, lang, order, orderBy) {
    const resources = await getResourcesBySlug("pages", slug, lang, {
      fields: "id",
    });
    const { id } = resources[0] || {};
    if (id) {
      return getPagesByParentId(id, lang, order, orderBy);
    }
    return [];
  }
  async function getPageBySlug(slug, lang) {
    const resources = await getResourcesBySlug("pages", slug, lang);
    const resource = resources[0] || {};
    if (isEmpty(resource)) {
      return resource;
    }
    const options = await getOptions(lang);
    return createPageFrom(resource, options, lang);
  }
  async function getPageById(id, lang) {
    const resource = await getResourceById("pages", id, lang);
    if (isEmpty(resource)) {
      return resource;
    }
    const options = await getOptions(lang);
    return createPageFrom(resource, options, lang);
  }
  async function getPostBySlug(slug, lang) {
    const resources = await getResourcesBySlug("posts", slug, lang, {
      embed: 1,
    });
    const resource = resources[0];
    if (isEmpty(resource)) {
      return undefined;
    }
    const post = {
      ...resource,
      // eslint-disable-next-line no-underscore-dangle
      author: resource._embedded.author[0],
      content: resource.content.rendered,
      // eslint-disable-next-line no-underscore-dangle
      featured_media: resource._embedded["wp:featuredmedia"][0],
      title: resource.title.rendered,
    };
    return post;
  }

  const api = {
    pages: ({
      id,
      slug,
      locale = DEFAULT_LOCALE,
      order = "asc",
      orderBy = "menu_order",
    }) => ({
      get first() {
        return (async () => {
          if (id) {
            return getPageById(id, locale);
          }
          if (slug) {
            return getPageBySlug(slug, locale);
          }
          return {};
        })();
      },
      get children() {
        return (async () => {
          if (id) {
            return getPagesByParentId(id, locale, order, orderBy);
          }
          if (slug) {
            return getPagesByParentSlug(slug, locale, order, orderBy);
          }
          return [];
        })();
      },
    }),
    posts: ({ slug, locale = DEFAULT_LOCALE }) => ({
      get first() {
        return (async () => {
          if (slug) {
            return getPostBySlug(slug, locale);
          }
          return undefined;
        })();
      },
    }),
  };
  return api;
}

export default wp;
