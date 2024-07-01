import { deepmerge } from "@mui/utils";

import mapLinkTypeToHref, { NodeType } from "../utils/mapLinkTypeToHref";
import { Field, FieldHook, PayloadRequest } from "payload/types";

async function insertHref(nodes: NodeType[] | null, payload: PayloadRequest) {
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
        if (typeof doc?.value === "string") {
          const { relationTo: collection, value: id } = doc;
          if (payload.findByID) {
            // @ts-ignore
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
        }
        const href: string = mapLinkTypeToHref({ ...node, doc }) as string;
        newNode = { ...node, href };
      }
      newNode.children = await insertHref(node.children as NodeType[], payload);
      return newNode;
    }),
  );
}

async function mapLinkToHrefAfterRead({
  req: { payload },
  value,
}: {
  value?: any;
  req: { payload: PayloadRequest };
}) {
  if (!value?.length) {
    return value;
  }
  return insertHref(value, payload);
}

function richText(overrides: Partial<Field>): Field {
  const richTextResult: Partial<Field> = {
    type: "richText",
    hooks: {
      afterRead: [
        mapLinkToHrefAfterRead as unknown as FieldHook<any, any, any>,
      ],
    },
  };

  return deepmerge(richTextResult, overrides) as Field;
}

export default richText;
