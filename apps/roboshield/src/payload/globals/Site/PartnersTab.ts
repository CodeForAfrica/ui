import image from "../../fields/image";
import link from "../../fields/links/link";
import richText from "../../fields/richText";

const PartnersTab = {
  label: "Partners",
  fields: [
    {
      name: "partnerHeaderTitle",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "partners",
      label: "Partners",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        image({
          overrides: {
            label: "Logo",
            name: "logo",
            required: true,
          },
        }),
        link({
          defaultValue: "custom",
          disableLinkTypeSelection: true,
          disableOpenInNewTab: true,
        }),
      ],
    },
  ],
};

export default PartnersTab;
