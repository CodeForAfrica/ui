import ResetPasswordTab from "./ResetPasswordTab";

import settings from "#civicsignalblog/payload/utils/createGlobalSettings";

const ResetPassword = settings({
  slug: `reset-password-form`,
  label: "Password Reset",
  group: "Forms",
  access: {
    read: () => true,
  },
  tabs: [ResetPasswordTab],
});

export default ResetPassword;
