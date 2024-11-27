import LoginTab from "./Components/LoginTab";
import PasswordTab from "./Components/PasswordTab";
import RegisterTab from "./Components/RegisterTab";

import settings from "#civicsignalblog/payload/utils/createGlobalSettings";

const Main = settings({
  slug: `settings-auth-forms`,
  label: "Auth Forms",
  group: "Settings",
  tabs: [LoginTab, RegisterTab, PasswordTab],
});

export default Main;
