import BaseContentCollection from "./BaseContentCollection";

const Helplines = BaseContentCollection("helplines", {
  hasTags: false,
  labels: {
    singular: {
      en: "Helpline",
    },
    plural: {
      en: "Helplines",
    },
  },
});

export default Helplines;
