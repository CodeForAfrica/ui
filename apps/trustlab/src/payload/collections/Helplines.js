import BaseContentCollection from "./BaseContentCollection";

const Helplines = BaseContentCollection("helplines", {
  hasTags: false,
  abels: {
    singular: {
      en: "Helpline",
    },
    plural: {
      en: "Helplines",
    },
  },
});

export default Helplines;
