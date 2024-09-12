import { Tab } from "payload";
import image from "@/custom-fields/image";
import richText from "@/custom-fields/RichText";

const GeneralTab: Tab = {
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
          localized: true,
        },
        richText({
          name: "description",
          required: true,
          localized: true,
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
            required: true,
            localized: true,
            admin: {
              description: "Shown on main navigation bar.",
            },
          },
        }),
        image({
          overrides: {
            name: "secondaryLogo",
            localized: true,
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
