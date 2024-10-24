import { ROLE_ADMIN, ROLE_EDITOR } from "./roles";

const isAdminOrEditor = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin or editor role
  return (
    Boolean(user?.roles?.includes(ROLE_ADMIN)) ||
    Boolean(user?.roles?.includes(ROLE_EDITOR))
  );
};

export default isAdminOrEditor;
