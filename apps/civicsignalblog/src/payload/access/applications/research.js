import canAccessApplication from "#civicsignalblog/payload/access/canAccessApplication";
import { RESEARCH } from "#civicsignalblog/payload/lib/data/common/applications";

const canRead = ({ req }) => {
  return canAccessApplication(req, RESEARCH);
};

export default canRead;
