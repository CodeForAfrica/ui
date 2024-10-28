import Geography from "./Geography";
import PanelOptions from "./PanelOptions";
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
      name: "enableHURUMap",
      label: "Enable HURUMap",
      type: "checkbox",
      defaultValue: false,
    },
    {
      type: "tabs",
      tabs: [Profile, Geography, Tutorial, PanelOptions],
      admin: {
        condition: (_, siblingData) => !!siblingData?.enableHURUMap,
      },
    },
  ],
};

export default HURUMap;
