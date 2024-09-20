import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, "civicsignal");
};

export default canRead;
