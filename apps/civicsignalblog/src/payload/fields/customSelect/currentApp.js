import CustomSelectComponent from "#civicsignalblog/payload/components/allowedAppSelect/index";

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
