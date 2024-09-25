import { RESEARCH } from "../../data/common/applications";
import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, RESEARCH);
};

export default canRead;
