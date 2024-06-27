import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import richText from "../../fields/richText";

const HeroTab = {
  label: "Hero",
  fields: [
    {
      name: "hero_headers",
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
          name: "heading_type",
          label: "Heading Type",
          type: "select",
          hasMany: false,
          options: [
            {
              label: "Large Heading",
              value: "large_heading",
            },
            {
              label: "Sub Heading",
              value: "sub_heading",
            },
            {
              label: "Heading with rotating text (comma separated)",
              value: "rotating_text",
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
      name: "heading_line_4",
      required: true,
      label: "Descriptive Text",
    }),
    {
      name: "button",
      type: "text",
      label: "Call to Action Button Text",
    },
  ],
};

export default HeroTab;
