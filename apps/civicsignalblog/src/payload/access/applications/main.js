import { MAIN } from "../../../lib/data/json/applications";
import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, MAIN);
};

export default canRead;
