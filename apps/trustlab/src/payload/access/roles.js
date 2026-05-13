export const ROLE_ADMIN = "administrator";
export const ROLE_EDITOR = "editor";
export const ROLE_AUTHOR = "author";
export const ROLE_OPTIONS = [
  { label: "Administrator", value: ROLE_ADMIN },
  { label: "Editor", value: ROLE_EDITOR },
  { label: "Author", value: ROLE_AUTHOR },
];

export const hasValidRole = (user) =>
  ROLE_OPTIONS.some(({ value }) => user?.role === value);

export default undefined;
