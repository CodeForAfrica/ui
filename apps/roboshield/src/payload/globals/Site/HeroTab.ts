import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import richText from "../../fields/richText";

const HeroTab = {
  label: "Hero",
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
      name: "heroDescriptiveText",
      required: true,
      label: "Descriptive Text",
    }),
    {
      name: "heroButtonText",
      type: "text",
      label: "Call to Action Button Text",
    },
  ],
};

export default HeroTab;
