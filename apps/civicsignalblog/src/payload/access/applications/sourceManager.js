import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, "source_manager");
};

export default canRead;
