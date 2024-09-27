import canAccessApplication from "@/civicsignalblog/payload/access/canAccessApplication";
import { RESEARCH } from "@/civicsignalblog/payload/lib/data/common/applications";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, RESEARCH);
};

export default canRead;
