import { deepmerge } from "@mui/utils";

import mapLinkTypeToHref from "../utils/mapLinkTypeToHref";

async function insertHref(nodes, payload) {
  if (!nodes?.length) {
    // Front-end needs `null` for serialization
    return null;
  }
  return Promise.all(
    nodes.map(async (node) => {
      let newNode = node;
      // The most important thing is not to change the doc structure
      // since the admin UI expects it to be in certain why. But of course,
      // we can add href prop for front-end.
      if (node.type === "link") {
        let { doc } = node;
        if (typeof doc.value === "string") {
          const { relationTo: collection, value: id } = doc;
          const value = await payload.findByID({
            collection,
            id,
            // We only need slug from the collection don't expand the whole
            // relationship. We may end up getting stuck on infinite recursion if
            // collection contain other links.
            depth: 0,
          });
          doc = { ...doc, value };
        }
        const href = mapLinkTypeToHref({ ...node, doc });
        newNode = { ...node, href };
      }
      newNode.children = await insertHref(node.children, payload);
      return newNode;
    })
  );
}

async function mapLinkToHrefAfterRead({ req: { payload }, value }) {
  if (!value?.length) {
    return value;
  }
  return insertHref(value, payload);
}

function richText(overrides) {
  const richTextResult = {
    type: "richText",
    hooks: {
      afterRead: [mapLinkToHrefAfterRead],
    },
  };

  return deepmerge(richTextResult, overrides);
}

export default richText;
