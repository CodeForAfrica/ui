import LoginTab from "./LoginTab";

import settings from "#civicsignalblog/payload/utils/createGlobalSettings";

const Main = settings({
  slug: `login-form`,
  label: "Login",
  group: "Forms",
  access: {
    read: () => true,
  },
  tabs: [LoginTab],
});

export default Main;
