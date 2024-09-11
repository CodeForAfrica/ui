import type { User } from "@/payload-types";

export const checkUserRoles = (
  allRoles: User["roles"] = [],
  user: any = undefined
): boolean => {
  if (user) {
    if (
      allRoles.some((role) => {
        return user?.roles?.some((individualRole: string) => {
          return individualRole === role;
        });
      })
    )
      return true;
  }

  return false;
};
