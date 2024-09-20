import canAccessApplication from "../canAccessApplication";

const canRead = ({ req: { user } }) => {
  return canAccessApplication(user, "research_blog");
};

export default canRead;
