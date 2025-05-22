import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
} from "@/trustlab/payload/access/roles";

// Field hook that only runs on the role field
export const protectRoleField = async ({
  req,
  data,
  originalDoc,
  operation,
}) => {
  // ensure first user is admin
  if (operation === "create") {
    const { docs } = await req.payload.find({
      collection: "users",
      limit: 1,
    });
    if (!docs.length) {
      return ROLE_ADMIN;
    }
  }

  // if role is not changed, return original role
  if (data?.role === originalDoc?.role) {
    return originalDoc?.role;
  }

  const { user } = req;

  if (!user) {
    return originalDoc?.role || ROLE_AUTHOR;
  }

  const userRole = user.role;

  // admin can update any role
  if (userRole === ROLE_ADMIN) {
    return data?.role;
  }

  // author cannot update role
  if (userRole === ROLE_AUTHOR) {
    return originalDoc?.role || ROLE_AUTHOR;
  }
  // editor can update role to editor or author only
  if (userRole === ROLE_EDITOR) {
    if (data?.role === ROLE_EDITOR || data?.role === ROLE_AUTHOR) {
      return data?.role;
    }
    if (operation === "create") {
      if (data?.role === ROLE_ADMIN) {
        return ROLE_AUTHOR;
      }
    }
    return originalDoc?.role;
  }

  // default to author
  return ROLE_AUTHOR;
};

export default undefined;
