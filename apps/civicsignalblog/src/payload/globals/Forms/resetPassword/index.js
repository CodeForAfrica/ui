import ResetPasswordTab from "./ResetPasswordTab";

import settings from "#civicsignalblog/payload/utils/createGlobalSettings";

const ResetPassword = settings({
  slug: `reset-password-form`,
  label: "Password",
  group: "Forms",
  access: {
    read: () => true,
  },
  tabs: [ResetPasswordTab],
});

export default ResetPassword;
