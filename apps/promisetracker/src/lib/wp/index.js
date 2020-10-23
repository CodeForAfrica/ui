import isEmpty from "lodash/isEmpty";

import config from "@/promisetracker/config";

function wp(site) {
  const SITE = site?.length ? `${site.trim().toUpperCase()}_` : "";
  const DEFAULT_LANG =
    process.env[`${SITE}DEFAULT_LANG`] || config.DEFAULT_LANG;
  const WP_DASHBOARD_URL =
    process.env[`${SITE}WP_DASHBOARD_URL`] || config.WP_DASHBOARD_URL;
  const WP_DASHBOARD_API_URL = `${WP_DASHBOARD_URL}/wp-json/wp/v2`;
  const WP_DASHBOARD_ACF_API_URL = `${WP_DASHBOARD_URL}/wp-json/acf/v3`;

  async function getOptions(lang) {
    const res = await fetch(
      `${WP_DASHBOARD_ACF_API_URL}/options/hurumap-site?lang=${lang}`
    );
    const { acf: data = {} } = res.ok ? await res.json() : {};
    data.actNow = {
      description: data.act_now.description,
      title: data.act_now.title,
      buttonLabel: data.act_now.button_label,
      link: data.act_now.link,
    };
    return data;
  }
  async function getPostsBySlug(type, slug, lang) {
    const res = await fetch(
      `${WP_DASHBOARD_API_URL}/${type}?slug=${slug}&lang=${lang}`
    );
    const data = res.ok ? await res.json() : [];
    return data;
  }
  async function getPostsByParentId(type, parent, lang, order, orderBy) {
    const res = await fetch(
      `${WP_DASHBOARD_API_URL}/${type}?parent=${parent}&order=${order}&orderby=${orderBy}&lang=${lang}`
    );
    const data = res.ok ? res.json() : [];
    return data;
  }
  async function getPostById(type, id, lang) {
    const res = await fetch(
      `${WP_DASHBOARD_API_URL}/${type}/${id}?lang=${lang}`
    );
    const data = res.ok ? res.json() : {};
    return data;
  }
  async function getPagesByParentId(parent, lang, order, orderBy) {
    const children = await getPostsByParentId(
      "pages",
      parent,
      lang,
      order,
      orderBy
    );
    const options = children.length && (await getOptions(lang));
    const data = children.map((child) => ({
      ...options,
      ...child,
      content: child.content?.rendered,
      languge: lang,
      title: child.title?.rendered,
    }));
    return data;
  }
  async function getPagesByParentSlug(slug, lang, order, orderBy) {
    const posts = await getPostsBySlug("pages", slug, lang);
    const post = posts[0] || {};
    if (post.id) {
      return getPagesByParentId(post.id, lang, order, orderBy);
    }
    return [];
  }
  async function getPageBySlug(slug, lang) {
    const posts = await getPostsBySlug("pages", slug, lang);
    const post = posts[0] || {};
    if (isEmpty(post)) {
      return post;
    }
    const options = await getOptions(lang);
    const page = {
      ...options,
      ...post,
      content: post.content?.rendered,
      languge: lang,
      title: post.title?.rendered,
    };
    return page;
  }
  async function getPageById(id, lang) {
    const post = await getPostById("pages", id, lang);
    if (isEmpty(post)) {
      return post;
    }
    const options = await getOptions(lang);
    const page = {
      ...options,
      ...post,
      content: post.content?.rendered,
      languge: lang,
      title: post.title?.rendered,
    };
    return page;
  }

  const api = {
    pages: ({
      id,
      slug,
      lang = DEFAULT_LANG,
      order = "asc",
      orderBy = "menu_order",
    }) => ({
      get first() {
        return (async () => {
          if (id) {
            return getPageById(id, lang);
          }
          if (slug) {
            return getPageBySlug(slug, lang);
          }
          return {};
        })();
      },
      get children() {
        return (async () => {
          if (id) {
            return getPagesByParentId(id, lang, order, orderBy);
          }
          if (slug) {
            return getPagesByParentSlug(slug, lang, order, orderBy);
          }
          return [];
        })();
      },
    }),
  };
  return api;
}

export default wp;
