/* eslint-disable import/prefer-default-export */

export const checkRole = (roles = [], user = null) => {
  if (!user) return false;
  return roles.some((role) => user.roles.includes(role));
};
