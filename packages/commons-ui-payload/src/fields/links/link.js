import { deepmerge } from "@mui/utils";

import mapLinkTypeToHref from "@/commons-ui/payload/utils/mapLinkTypeToHref";

export async function mapLinkToHrefBeforeValidate({
  siblingData,
  req: { payload },
}) {
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
  const linkResult = {
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
          width: "30%",
        },
      },
    ],
  };

  const linkTypes = [
    {
      name: "doc",
      label: {
        en: "Document to link to",
      },
      type: "relationship",
      relationTo: ["pages"],
      required,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === "internal",
        width: disableOpenInNewTab ? "40%" : "30%",
      },
    },
    {
      name: "url",
      label: {
        en: "Custom URL",
      },
      type: "text",
      required,
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === "custom",
        width: disableOpenInNewTab ? "40%" : "30%",
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
  ];
  let labelFields = [];
  if (!disableLabel) {
    labelFields = [
      {
        name: "label",
        label: {
          en: "Label",
          pt: "Rótulo",
        },
        type: "text",
        required,
        localized: true,
        admin: {
          width: "30%",
        },
      },
    ];
  }
  linkResult.fields = [...labelFields, ...linkResult.fields, ...linkTypes];
  if (!disableOpenInNewTab) {
    linkResult.fields.push({
      name: "newTab",
      label: {
        en: "Open in new tab",
      },
      type: "checkbox",
      admin: {
        style: {
          alignSelf: "flex-end",
        },
      },
    });
  }

  return deepmerge(linkResult, overrides);
};

export default link;
