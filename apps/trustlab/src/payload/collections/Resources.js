import BaseContentCollection from "./BaseContentCollection";

const Resources = BaseContentCollection("resources", {
  labels: {
    singular: {
      en: "Resource",
    },
    plural: {
      en: "Resources",
    },
  },
});

export default Resources;
