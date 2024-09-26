import canAccessApplication from "../canAccessApplication";

import { MAIN } from "@/civicsignalblog/payload/lib/data/common/applications";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, MAIN);
};

export default canRead;
