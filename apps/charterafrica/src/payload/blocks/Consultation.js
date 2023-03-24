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
          type: "group",
          name: "playlist",
          fields: [
            {
              name: "title",
              label: {
                en: "Title",
                fr: "Titre",
                pt: "Título",
              },
              admin: {
                description: () => "Playlist title e.g previous consultation",
              },
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "link",
              label: {
                en: "Playlist URL",
                fr: "URL de liste de lecture",
                pt: "URL da lista de reprodução",
              },
              type: "text",
              admin: {
                description: () =>
                  "Valid YouTube playlist URL e.g https://www.youtube.com/watch?list=RDEMPsM0esWCZxNU2OE89iz0kA or https://www.youtube.com/playlist?list=PLd9BS3XfsFcw4zmhpJWANl6HWc4olrKkg",
              },
              required: true,
            },
            {
              name: "playlistId",
              admin: {
                hidden: true,
              },
              required: true,
              hooks: {
                beforeValidate: [mapPlaylistLinkToId],
              },
              type: "text",
            },
          ],
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
