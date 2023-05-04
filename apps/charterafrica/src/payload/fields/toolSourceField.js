const source = () => ({
  name: "source",
  type: "select",
  label: {
    en: "Source",
    pt: "Fonte",
    fr: "Source",
  },
  defaultValue: "github",
  options: [
    { label: "Github", value: "github" },
    { label: "Gitlab", value: "gitlab" },
    { label: "Bitbucket", value: "bitbucket" },
  ],
  required: true,
  admin: {
    readOnly: true,
  },
});

export default source;
