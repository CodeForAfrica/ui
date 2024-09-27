import canAccessApplication from "@/civicsignalblog/payload/access/canAccessApplication";
import { MAIN } from "@/civicsignalblog/payload/lib/data/common/applications";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, MAIN);
};

export default canRead;
