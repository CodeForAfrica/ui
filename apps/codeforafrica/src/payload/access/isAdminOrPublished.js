import { ROLE_ADMIN } from "./roles";

export const isAdminOrPublished = ({ req: { user } }) => {
  if (user?.roles?.includes(ROLE_ADMIN)) {
    return true;
  }
  return {
    _status: {
      equals: "published",
    },
  };
};

export default undefined;
