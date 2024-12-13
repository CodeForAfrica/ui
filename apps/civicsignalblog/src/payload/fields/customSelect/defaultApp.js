import CustomSelectComponent from "#civicsignalblog/payload/components/allowedAppSelect";

const DefaultAppSelectField = {
  name: "defaultApp",
  type: "text",
  admin: {
    components: {
      Field: CustomSelectComponent,
    },
  },
  label: "Default App",
};

export default DefaultAppSelectField;
