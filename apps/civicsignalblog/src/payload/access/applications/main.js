import { MAIN } from "../../data/common/applications";
import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, MAIN);
};

export default canRead;
