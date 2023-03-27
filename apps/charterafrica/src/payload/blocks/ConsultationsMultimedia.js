import CustomSelect from "../fields/youtubeSelect/youtubeSelect.tsx";
import { mapPlaylistLinkToId } from "../utils/mapPlaylistLinkToId";

const ConsultationsMultimedia = {
  slug: "consultation-multimedia",
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
                description: () => "e.g Previous Consultation",
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
                  "Valid YouTube playlist URL e.g https://www.youtube.com/watch?list=<id> or https://www.youtube.com/playlist?list=<id>",
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
      type: "collapsible",
      label: {
        en: "Featured Consultations",
        fr: "Consultations en vedette",
        pt: "Consultas em destaque",
      },
      fields: [
        {
          name: "featuredType",
          type: "radio",
          options: [
            {
              label: {
                en: "Most recent in the Playlist",
                fr: "Le plus récent dans la playlist",
                pt: "Mais recente na lista de reprodução",
              },
              value: "latest",
            },
            {
              label: {
                en: "Custom Selection",
                fr: "Sélection personnalisée",
                pt: "Seleção personalizada",
              },
              value: "custom",
            },
          ],
          defaultValue: "latest",
        },
        {
          name: "featured",
          label: {
            en: "Featured Consultations",
            fr: "Consultations en vedette",
            pt: "Consultas em destaque",
          },
          type: "array",
          admin: {
            condition: (_, siblingData) =>
              siblingData?.featuredType === "custom",
          },
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
              name: "videoId",
              label: { en: "Video", fr: "Vidéo", pt: "Vídeo" },
              type: "text",
              required: true,
              localized: true,
              admin: {
                components: {
                  Field: CustomSelect,
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default ConsultationsMultimedia;
