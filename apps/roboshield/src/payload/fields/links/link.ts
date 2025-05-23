import { deepmerge } from "@mui/utils";

import mapLinkTypeToHref from "../../utils/mapLinkTypeToHref";
import type {
  RowField,
  SanitizedCollectionConfig,
  PayloadRequest,
  Condition,
} from "payload";

interface CollectionBeforeReadHookArgs {
  collection: SanitizedCollectionConfig;
  siblingData: any;
  doc: any;
  query: {
    [key: string]: any;
  };
  req: PayloadRequest;
}

export async function mapLinkToHrefBeforeValidate({
  siblingData,
  req: { payload },
}: CollectionBeforeReadHookArgs) {
  // Don't modify original doc.
  const doc = { ...siblingData.doc };
  if (typeof doc.value === "string") {
    const { relationTo: collection, value: id } = doc;
    doc.value = await payload.findByID({
      collection,
      id,
      // We only need slug from the collection don't expand the whole
      // relationship. We may end up getting stuck on infinite recursion if
      // collection contain other links.
      depth: 0,
    });
  }
  const href = mapLinkTypeToHref({ ...siblingData, doc });

  return href;
}

const link = ({
  defaultValue = "internal",
  disableLabel = false,
  disableLinkTypeSelection = false,
  disableOpenInNewTab = false,
  overrides = {},
  required = true,
} = {}) => {
  const linkResult: RowField = {
    type: "row",
    fields: [
      {
        name: "linkType",
        type: "radio",
        options: [
          {
            label: {
              en: "Custom URL",
            },
            value: "custom",
          },
          {
            label: {
              en: "Internal link",
            },
            value: "internal",
          },
        ],
        defaultValue,
        admin: {
          hidden: disableLinkTypeSelection,
        },
      },
    ],
  };

  const linkTypes = [
    {
      type: "row",
      fields: [
        {
          name: "doc",
          label: {
            en: "Document to link to",
            fr: "Document pour lien vers",
            pt: "Documento para link para",
          },
          type: "relationship",
          relationTo: ["pages"],
          required,
          maxDepth: 1,
          admin: {
            condition: ((_, siblingData) =>
              siblingData?.linkType === "internal") as Condition,
          },
        },
        {
          name: "url",
          label: {
            en: "Custom URL",
            fr: "URL personnalisée",
            pt: "URL personalizado",
          },
          type: "text",
          required,
          admin: {
            condition: ((_, siblingData) =>
              siblingData?.linkType === "custom") as Condition,
          },
        },
        {
          name: "href",
          type: "text",
          required,
          admin: {
            hidden: true,
          },
          hooks: {
            beforeValidate: [mapLinkToHrefBeforeValidate],
          },
        },
      ],
    },
  ];
  let labelFields: any = [];
  if (!disableLabel) {
    labelFields = [
      {
        type: "row",
        fields: [
          {
            name: "label",
            label: {
              en: "Label",
              pt: "Rótulo",
            },
            type: "text",
            required,
          },
        ],
      },
    ];
  }
  linkResult.fields = [...labelFields, ...linkResult.fields, ...linkTypes];
  if (!disableOpenInNewTab) {
    linkResult.fields.push({
      type: "row",
      fields: [
        {
          name: "newTab",
          label: {
            en: "Open in new tab",
            fr: "Ouvrir dans un nouvel onglet",
            pt: "Abrir num novo separador",
          },
          type: "checkbox",
        },
      ],
    });
  }

  return deepmerge(linkResult, overrides);
};

export default link;
