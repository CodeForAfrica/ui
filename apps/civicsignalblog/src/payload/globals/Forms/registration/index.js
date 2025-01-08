import RegistrationTab from "./RegistrationTab";

import settings from "#civicsignalblog/payload/utils/createGlobalSettings";

const Registration = settings({
  slug: `registration-form`,
  label: "Registration",
  group: "Forms",
  access: {
    read: () => true,
  },
  tabs: [RegistrationTab],
});

export default Registration;
