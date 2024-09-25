import { RESEARCH } from "../../../lib/data/json/applications";
import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, RESEARCH);
};

export default canRead;
