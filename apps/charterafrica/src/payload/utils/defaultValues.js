const defaultValue =
  (translation) =>
  ({ locale }) =>
    translation[locale];

export default defaultValue;
