import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, "explorer");
};

export default canRead;
