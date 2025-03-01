import DataPanels from "./DataPanels";
import Profile from "./Profile";
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
      name: "enabled",
      label: "Enable HURUMap",
      type: "checkbox",
      defaultValue: false,
    },
    {
      type: "tabs",
      tabs: [Profile, DataPanels, Tutorial],
      admin: {
        condition: (_, siblingData) => !!siblingData?.enabled,
      },
    },
  ],
};

export default HURUMap;
