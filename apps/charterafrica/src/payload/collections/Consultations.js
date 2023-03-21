import mapLinkToId from "../utils/mapPlaylistLinkToId";

const Consultations = {
  slug: "consultation",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      en: "Consultation",
      fr: "Consultation",
      pt: "Consulta",
    },
    plural: {
      en: "Consultations",
      fr: "Consultations",
      pt: "Consultas",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "playlistLink",
      label: {
        en: "Playlist",
        fr: "Playlist",
        pt: "Lista de reprodução",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "playlistId",
      label: {
        en: "Playlist ID",
        fr: "Identifiant de la liste de lecture",
        pt: "ID da lista de reprodução",
      },
      hooks: {
        beforeValidate: [mapLinkToId],
      },
      type: "text",
      localized: true,
      hidden: true,
    },
  ],
};

export default Consultations;
