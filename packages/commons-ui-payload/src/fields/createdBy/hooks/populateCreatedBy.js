/* eslint-disable import/prefer-default-export */

export const populateCreatedBy = async ({
  req: { user },
  value,
  operation,
}) => {
  if (operation === "create") {
    return user?.id;
  }
  return value;
};
