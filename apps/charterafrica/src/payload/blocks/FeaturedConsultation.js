const FeaturedConsultation = {
  slug: "featured-consultation",
  labels: {
    singular: {
      en: "Featured Consultation",
      pt: "Consulta em destaque",
      fr: "Consultation en vedette",
    },
    plural: {
      en: "Featured Consultations",
      pt: "Consultas em destaque",
      fr: "Consultations en vedette",
    },
  },
  fields: [
    {
      name: "featuredConsultation",
      label: {
        en: "Featured Consultation",
        pt: "Consulta em destaque",
        fr: "Consultation en vedette",
      },
      type: "relationship",
      relationTo: ["consultation"],
      required: true,
    },
  ],
};

export default FeaturedConsultation;
