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
  // If role is not changed, return original role
  if (data?.role === originalDoc?.role) {
    return originalDoc?.role;
  }

  // Ensure first user is admin
  if (operation === "create") {
    const { docs } = await req.payload.find({
      collection: "users",
      limit: 1,
    });
    if (!docs.length) {
      return ROLE_ADMIN;
    }
  }

  const { user } = req;
  if (!user) {
    return originalDoc?.role || ROLE_AUTHOR;
  }

  switch (user.role) {
    case ROLE_ADMIN:
      return data?.role;
    case ROLE_EDITOR:
      // Editor can only set role to EDITOR or AUTHOR
      if ([ROLE_EDITOR, ROLE_AUTHOR].includes(data?.role)) {
        return data?.role;
      }
      // Ensure editors cannot create admin users
      return operation === "create" ? ROLE_AUTHOR : originalDoc?.role;
    // Fallback to author
    case ROLE_AUTHOR:
    default:
      return originalDoc?.role || ROLE_AUTHOR;
  }
};

export default undefined;
