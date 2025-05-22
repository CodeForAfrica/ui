export const checkRole = (roles, user) => {
  if (!user) {
    return false;
  }
  return roles.includes(user.role);
};

export default undefined;
