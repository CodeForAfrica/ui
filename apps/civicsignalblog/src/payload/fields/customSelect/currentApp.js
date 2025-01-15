import CustomSelectComponent from "#civicsignalblog/payload/components/allowedAppSelect";

const CurrentAppSelectField = {
  name: "currentApp",
  type: "text",
  admin: {
    components: {
      Field: CustomSelectComponent,
    },
  },
  label: "Current App",
};

export default CurrentAppSelectField;
