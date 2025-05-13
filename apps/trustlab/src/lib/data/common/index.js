function getPageSlug({ params }) {
  const slugsCount = params?.slugs?.length;
  // count < 3, page slug is the last slug e.g. ["about"] or ["knowldge/news"]
  // count == 3, page slug is the 2nd slug (index 1); last slug (index 3)
  //             is the post. e.g. opportunities/grants/democratic-governance-in-zambia
  const pageSlugIndex = slugsCount < 3 ? slugsCount - 1 : 1;
  return params?.slugs?.[pageSlugIndex] || "index";
}

function getDefaultErrorPageProps(slug = "404") {
  if (slug === "500") {
    return {
      blocks: [
        {
          title: "Server Error.",
          subtitle: [
            {
              children: [
                {
                  text: "Don't worry!, you can head back to our ",
                  children: null,
                },
                {
                  type: "link",
                  newTab: false,
                  url: "/",
                  children: [
                    {
                      text: "homepage",
                      children: null,
                    },
                  ],
                  href: "/",
                },
                {
                  text: "check out our most recent ",
                  children: null,
                },
                {
                  type: "link",
                  newTab: false,
                  url: "/projects",
                  children: [
                    {
                      text: "projects",
                      children: null,
                    },
                  ],
                  href: "/projects",
                },
                {
                  text: ", or read below some of the contents produced by our amazing team while the technical team is working on fixing the issue.",
                  children: null,
                },
              ],
            },
          ],
          slug: "error",
        },
      ],
    };
  }

  return {
    blocks: [
      {
        title: "Whoops! This page got lost in conversation! ",
        subtitle: [
          {
            children: [
              {
                text: "Don't worry!, you can head back to our ",
                children: null,
              },
              {
                type: "link",
                newTab: false,
                url: "/",
                children: [
                  {
                    text: "homepage",
                    children: null,
                  },
                ],
                href: "/",
              },
              {
                text: "check out our most recent ",
                children: null,
              },
              {
                type: "link",
                newTab: false,
                url: "/projects",
                children: [
                  {
                    text: "projects",
                    children: null,
                  },
                ],
                href: "/projects",
              },
              {
                text: ", or read below some of the contents produced by our amazing team.",
                children: null,
              },
            ],
          },
        ],
        slug: "error",
      },
    ],
  };
}

export async function getPageProps(api, context) {
  const slug = getPageSlug(context);
  let {
    docs: [page],
  } = await api.findPage(slug);

  if (!page) {
    if (["404", "500"].includes(slug)) {
      return getDefaultErrorPageProps(slug);
    }
    return null;
  }
  return {};
}

export default getPageProps;
