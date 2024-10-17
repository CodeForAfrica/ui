import canAccessApplication from "#civicsignalblog/payload/access/canAccessApplication";
import { MAIN } from "#civicsignalblog/payload/lib/data/common/applications";

const canRead = ({ req }) => {
  return canAccessApplication(req, MAIN);
};

export default canRead;
