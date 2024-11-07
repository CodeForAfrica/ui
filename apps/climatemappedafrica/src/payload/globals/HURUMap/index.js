import HURUMapURL from "../../fields/HURUMapURL";

import DataPanels from "./DataPanels";
import Profile from "./Profile";
import RootGeography from "./RootGeography";
import Tutorial from "./Tutorial";

const HURUMap = {
  slug: "settings-hurumap",
  label: "HURUMap",
  description: "HURUMap Configuration",
  access: {
    read: () => true,
  },
  admin: {
    group: "Settings",
    hideAPIURL: true,
  },
  fields: [
    {
      name: "enableHURUMap",
      label: "Enable HURUMap",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "hurumapAPIURL",
      label: "HURUMap API BASE URL",
      type: "text",
      admin: {
        condition: (_, siblingData) => !!siblingData?.enableHURUMap,
        components: {
          Field: HURUMapURL,
        },
        description:
          "The base URL for the HURUmap API. For example, https://hurumap.org/api/v1",
      },
      required: true,
    },
    {
      name: "isHURUMapAPIURLValid",
      type: "checkbox",
      admin: {
        hidden: true,
        readOnly: true,
        condition: (_, siblingData) => !!siblingData?.enableHURUMap,
      },
    },
    {
      type: "tabs",
      tabs: [Profile, DataPanels, RootGeography, Tutorial],
      admin: {
        condition: (_, siblingData) =>
          !!siblingData?.enableHURUMap && !!siblingData?.isHURUMapAPIURLValid,
      },
    },
  ],
};

export default HURUMap;
