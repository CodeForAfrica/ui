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
