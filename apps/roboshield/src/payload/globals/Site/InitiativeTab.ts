import { Tab } from "payload/types";
import image from "../../fields/image";
import link from "../../fields/links/link";
import richText from "../../fields/richText";

const PartnersTab: Tab = {
  label: "Initiative",
  fields: [
    {
      name: "initiative",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        richText({
          name: "description",
          required: true,
        }),
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
    },
  ],
};

export default PartnersTab;
