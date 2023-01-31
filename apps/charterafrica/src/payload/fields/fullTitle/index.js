import populateFullTitle from "./populateFullTitle";

function fullTitle() {
  const fullTitleResult = {
    name: "fullTitle",
    label: {
      en: "Full title",
      fr: "Titre complet ",
      pt: "Título completo",
    },
    type: "text",
    hooks: {
      beforeChange: [populateFullTitle],
    },
    admin: {
      components: {
        Field: () => null,
      },
    },
  };

  return fullTitleResult;
}

export default fullTitle;
