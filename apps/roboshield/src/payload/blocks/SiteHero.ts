import { Block } from "payload/types";
import richText from "../fields/richText";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export const SiteHero: Block = {
  slug: "page-hero",
  imageURL: "/images/cms/blocks/hero.png",
  imageAltText: "Used in homepage",
  labels: {
    singular: "Site Hero",
    plural: "Site Hero",
  },
  interfaceName: "SiteHero",
  fields: [
    {
      name: "heroHeaders",
      type: "array",
      label: "Hero Components",
      minRows: 3,
      maxRows: 4,
      labels: {
        singular: "Header",
        plural: "Headers",
      },
      fields: [
        {
          name: "headingType",
          label: "Heading Type",
          type: "select",
          hasMany: false,
          options: [
            {
              label: "Large Heading",
              value: "largeHeading",
            },
            {
              label: "Sub Heading",
              value: "subHeading",
            },
            {
              label: "Heading with rotating text",
              value: "rotatingText",
            },
          ],
        },
        {
          name: "title",
          type: "text",
          label: "Content",
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Header ${String(index).padStart(2, "0")}`;
          },
        },
      },
    },
    richText({
      name: "heroDescription",
      required: true,
      label: "Description",
    }),
    {
      name: "heroCallToAction",
      type: "text",
      label: "Call to Action",
    },
  ],
};
