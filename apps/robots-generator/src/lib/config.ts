export const platforms = [
  {
    name: "none",
    label: "None",
    code: "",
  },
  {
    name: "wordpress",
    label: "WordPress",
    code: `Disallow: /wp-admin/\nDisallow: /wp-includes/\nAllow: /wp-admin/admin-ajax.php`,
  },
  {
    name: "squarespace",
    label: "Squarespace",
    code: `Disallow: /api/\nDisallow: /config/`,
  },
  {
    name: "wix",
    label: "Wix",
    code: `Disallow: /_api/\nDisallow: /files/\nDisallow: /site-assets/\nDisallow: /_partials/`,
  },
  {
    name: "weebly",
    label: "Weebly",
    code: `Disallow: /ajax/\nDisallow: /api/`,
  },
  {
    name: "joomla",
    label: "Joomla",
    code: `Disallow: /administrator/\nDisallow: /bin/\nDisallow: /cache/\nDisallow: /cli/\nDisallow: /components/\nDisallow: /includes/\nDisallow: /installation/\nDisallow: /language/\nDisallow: /layouts/\nDisallow: /libraries/\nDisallow: /logs/\nDisallow: /modules/\nDisallow: /plugins/\nDisallow: /tmp/`,
  },
  {
    name: "drupal",
    label: "Drupal",
    code: `Disallow: /core/\nDisallow: /includes/\nDisallow: /misc/\nDisallow: /modules/\nDisallow: /profiles/\nDisallow: /scripts/\nDisallow: /themes/\nDisallow: /update.php\nDisallow: /xmlrpc.php`,
  },
  {
    name: "webflow",
    label: "Webflow",
    code: `Disallow: /api/\nDisallow: /collections/\nDisallow: /editor/`,
  },
];
