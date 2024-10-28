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
      type: "tabs",
      tabs: [Profile, Tutorial],
    },
  ],
};

export default HURUMap;
