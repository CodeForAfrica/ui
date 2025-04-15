import { PayloadRequest } from "payload";
import { ROLE_ADMIN } from "./roles";

export const isAdminOrPublished = ({
  req: { user },
}: {
  req: PayloadRequest;
}) => {
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
