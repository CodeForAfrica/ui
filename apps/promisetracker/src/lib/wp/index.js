import isEmpty from "lodash/isEmpty";

import config from "@/promisetracker/config";
import serverFn from "@/promisetracker/lib/server";
import { formatDate } from "@/promisetracker/utils";

function wp(site) {
  const server = serverFn(site);
  const WP_DASHBOARD_URL = server.env("WP_DASHBOARD_URL");
  const WP_DASHBOARD_API_URL = `${WP_DASHBOARD_URL}/wp-json/wp/v2`;
  const WP_DASHBOARD_ACF_API_URL = `${WP_DASHBOARD_URL}/wp-json/acf/v3`;

  async function getMediaDetails() {
    // const fields = params?.fields ? `&_fields=${params.fields}` : "";
    // const embed = params?.embed ? `&_embed=${params.embed}` : "";
    const res = await fetch(
      `https://dashboard.hurumap.org/promisetracker/wp-json/wp/v2/media`
    );
    const data = res.ok ? await res.json() : [];
    console.log("media details:", data.media_details);
    return data;
  }
  getMediaDetails();

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
    const footer = {
      about: acf.about || null,
      copyright: {
        ...config.page?.copyright,
        children:
          acf.copyright?.copyright ?? config.page?.copyright?.children ?? null,
      },
      initiativeLogo: acf.initiative_logo || null,
      legalLinks: acf.legal_links || null,
      organizationLogo: acf.organization_logo || null,
      quickLinks: acf.quick_links || null,
      socialMedia: acf.social_media || null,
    };
    // WP sets urls to false if not set
    if (footer.initiativeLogo) {
      footer.initiativeLogo.image = footer.initiativeLogo.image || null;
    }
    if (footer.organizationLogo) {
      footer.organizationLogo.image = footer.organizationLogo.image || null;
    }

    const sortLabels = {
      sortByDeadline: acf.sort_by_deadline || null,
      sortByMostRecent: acf.sort_by_most_recent || null,
    };
    const data = {
      actNow,
      footer,
      navigation: acf.navigation || null,
      partners: acf.partners || null,
      promiseStatuses: acf.promiseStatuses || null,
      subscribe: acf.subscribe || null,
      sortLabels,
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

  async function getRevisionById(type, id, revisionId, token, lang, params) {
    const fields = params?.fields ? `&_fields=${params.fields}` : "";
    const embed = params?.embed ? `&_embed=${params.embed}` : "";
    const res = await fetch(
      `${WP_DASHBOARD_API_URL}/${type}/${id}/revisions/${revisionId}?lang=${lang}${fields}${embed}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.ok ? res.json() : {};
    return data;
  }

  function createPageFrom(resource, options, lang) {
    let { acf } = resource;
    acf = acf || {};
    let criteria = null;
    if (acf.criteria?.show) {
      criteria = {
        title: acf.criteria.title || null,
        items: options.promiseStatuses,
      };
    }
    acf.criteria = null;
    let partners = null;
    if (acf.partners_visibility?.show) {
      partners = {
        title: acf.partners_visibility.title || null,
        items: options.partners,
      };
    }
    acf.partners_visibility = null;
    const page = {
      ...acf,
      ...resource,
      ...options,
      criteria,
      content: resource.content?.rendered,
      partners,
      featuredImage: resource.featured_image_src || null,
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

  async function getPostBySlug(slug, lang) {
    const resources = await getResourcesBySlug("posts", slug, lang, {
      embed: "true",
    });
    const resource = resources[0];
    if (isEmpty(resource)) {
      return undefined;
    }

    // eslint-disable-next-line no-underscore-dangle
    const embedded = resource._embedded;

    const post = {
      ...resource,
      author: embedded.author[0],
      content: resource.content.rendered,
      featured_media: embedded["wp:featuredmedia"][0],
      title: resource.title.rendered,
      // set thumbail from acf | generated thumbnail | Featured Image
      thumbnail_image:
        resource.acf?.attributes?.thumbnail_image ||
        resource.featured_image_src ||
        embedded["wp:featuredmedia"][0] ||
        null,
    };
    return post;
  }

  async function getPageBySlug(slug, lang) {
    const resources = await getResourcesBySlug("pages", slug, lang);
    const resource = resources[0] || {};
    if (isEmpty(resource)) {
      return resource;
    }
    if (resource.acf?.posts) {
      const posts = await Promise.all(
        resource.acf?.posts?.map((post) =>
          getPostBySlug(post.post_name, lang, {
            embed: "true",
          })
        )
      );
      resource.acf.posts = posts || [];
    }
    const options = await getOptions(lang);
    return createPageFrom(resource, options, lang);
  }

  async function getPageById(id, lang) {
    const resource = await getResourceById("pages", id, lang);
    if (isEmpty(resource)) {
      return resource;
    }
    if (resource.acf?.posts) {
      const posts = await Promise.all(
        resource.acf?.posts?.map((post) =>
          getPostBySlug(post.post_name, lang, {
            embed: "true",
          })
        )
      );
      resource.acf.posts = posts || [];
    }
    const options = await getOptions(lang);
    return createPageFrom(resource, options, lang);
  }

  async function getPageRevisionById(id, revisionId, thumbnailId, token, lang) {
    const resource = await getRevisionById(
      "pages",
      id,
      revisionId,
      token,
      lang
    );
    if (isEmpty(resource)) {
      return resource;
    }
    const thumbnail = await getResourceById("media", thumbnailId, lang);

    resource.featured_image_src = thumbnail?.source_url || null;

    if (resource.acf?.posts) {
      const posts = await Promise.all(
        resource.acf?.posts?.map((post) =>
          getPostBySlug(post.post_name, lang, {
            embed: "true",
          })
        )
      );
      resource.acf.posts = posts || [];
    }

    const options = await getOptions(lang);
    return createPageFrom(resource, options, lang);
  }

  async function getPostRevisionById(id, revisionId, thumbnailId, token, lang) {
    const resource = await getRevisionById(
      "posts",
      id,
      revisionId,
      token,
      lang
    );

    if (isEmpty(resource)) {
      return undefined;
    }

    const author = await getResourceById("users", resource.author, lang);
    const thumbnail = await getResourceById("media", thumbnailId, lang);

    const post = {
      ...resource,
      author,
      content: resource.content.rendered,
      featured_media: thumbnail,
      title: resource.title.rendered,
      thumbnail_image: thumbnail.source_url,
    };
    return post;
  }

  /*  export async function getPostById(type, id, lang) {
    const res = await fetch(
      `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}/${id}?lang=${lang}`
    );
    return res.ok ? res.json() : null;
  } */

  const api = {
    pages: ({
      id,
      slug,
      locale = server.defaultLocale,
      order = "asc",
      orderBy = "menu_order",
      page,
    }) => ({
      get first() {
        return (async () => {
          if (id) {
            return getPageById(id, locale);
          }
          if (slug) {
            return getPageBySlug(slug, locale);
          }
          return page || {};
        })();
      },
      get children() {
        return (async () => {
          const parentId = id || page?.id;
          if (parentId) {
            return getPagesByParentId(parentId, locale, order, orderBy);
          }
          if (slug) {
            return getPagesByParentSlug(slug, locale, order, orderBy);
          }
          return [];
        })();
      },
      get posts() {
        return (async () => {
          let pageWithPosts;
          if (id) {
            pageWithPosts = await getPageById(id, locale);
          } else if (slug) {
            pageWithPosts = await getPageBySlug(slug, locale);
          } else {
            pageWithPosts = page;
          }
          const posts =
            pageWithPosts?.posts?.map((post) => ({
              image: post.thumbnail_image,
              description: post.content.replace(/(<([^>]+)>)/gi, ""),
              date: formatDate(post.date),
              slug: post.slug,
              title: post.title,
            })) || null;
          // console.log(posts)
          return posts;
        })();
      },
    }),
    posts: ({ slug, locale = server.defaultLocale }) => ({
      get first() {
        return (async () => {
          if (slug) {
            return getPostBySlug(slug, locale);
          }
          return undefined;
        })();
      },
    }),
    revisions: ({
      id,
      revisionId,
      thumbnailId,
      token,
      locale = server.defaultLocale,
    }) => ({
      get page() {
        return (async () => {
          if (id && revisionId) {
            return getPageRevisionById(
              id,
              revisionId,
              thumbnailId,
              token,
              locale
            );
          }
          return undefined;
        })();
      },
      get post() {
        return (async () => {
          if (id && revisionId) {
            return getPostRevisionById(
              id,
              revisionId,
              thumbnailId,
              token,
              locale
            );
          }
          return undefined;
        })();
      },
    }),
  };
  return api;
}
export default wp;
