import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, "topic_mapper");
};

export default canRead;
