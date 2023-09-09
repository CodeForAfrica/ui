import image from "../../fields/image";
import richText from "../../fields/richText";

const GeneralTab = {
  label: "General",
  fields: [
    {
      type: "collapsible",
      label: "Title & Description",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        richText({
          name: "description",
          label: "Description",
          required: true,
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Logo",
      fields: [
        image({
          overrides: {
            name: "primaryLogo",
            label: "Primary Logo",
            required: true,
            admin: {
              description: "Shown on main navigation bar.",
            },
          },
        }),
        image({
          overrides: {
            name: "secondaryLogo",
            label: "Secondary Logo",
            admin: {
              description:
                "Shown on main footer. If not provided, primary logo will be reused.",
            },
          },
        }),
      ],
    },
  ],
};

export default GeneralTab;
