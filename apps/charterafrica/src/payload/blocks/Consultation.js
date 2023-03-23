import {
  mapPlaylistLinkToId,
  mapVideoUrlToId,
} from "../utils/mapPlaylistLinkToId";

const Consultations = {
  slug: "consultation",
  labels: {
    singular: {
      en: "Consultation Playlist",
      fr: "Playlist de consultation",
      pt: "Consulta Lista de reprodução",
    },
    plural: {
      en: "Consultation Playlists",
      fr: "Playlist de consultations",
      pt: "Lista de reprodução de consulta",
    },
  },
  fields: [
    {
      type: "collapsible",
      label: {
        en: "Playlist",
        fr: "Playlist",
        pt: "Lista de reprodução",
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
          admin: {
            hidden: true,
          },
          hooks: {
            beforeValidate: [mapPlaylistLinkToId],
          },
          type: "text",
          localized: true,
        },
      ],
    },
    {
      name: "featured",
      label: {
        en: "Featured Consultations",
        fr: "Consultations en vedette",
        pt: "Consultas em destaque",
      },
      type: "array",
      fields: [
        {
          name: "title",
          label: {
            en: "Consultation Title",
            fr: "Titre de consultation",
            pt: "Título da consulta",
          },
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "videoLink",
          label: { en: "Video", fr: "Vidéo", pt: "Vídeo" },
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "videoId",
          label: { en: "Video ID", fr: "Identifiant vidéo", pt: "ID do vídeo" },
          admin: {
            hidden: true,
          },
          hooks: {
            beforeValidate: [mapVideoUrlToId],
          },
          type: "text",
          localized: true,
          required: true,
        },
      ],
    },
  ],
};

export default Consultations;
