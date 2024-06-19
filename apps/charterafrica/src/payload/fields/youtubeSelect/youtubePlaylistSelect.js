import { select } from "payload/dist/fields/validations";
import { createElement } from "react";

import {
  getEmbeddedPlaylist,
  mapPlaylistLinkToId,
} from "../../utils/embeddedPlaylist";

import YouTubeSelect from "./youtubeSelect";

async function validateYouTubeSelect(
  value,
  { data: document, hasMany, required, t },
  blockSlug,
) {
  let options = [];
  const { playlistId, queryString } = getEmbeddedPlaylist(document, blockSlug);
  if (playlistId) {
    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/opportunities/consultation/multimedia?${queryString}`,
    );
    const data = await response.json();
    options =
      data?.items?.map((item) => ({
        label: item?.snippet?.title,
        value: item?.snippet?.resourceId?.videoId,
      })) || [];
  }
  return select(value, { hasMany, options, required, t });
}

export default function youtubePlaylistSelect(slug) {
  return {
    type: "collapsible",
    label: {
      en: "Playlist",
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
              description: () => "e.g. Previous Consultation",
            },
            type: "text",
            localized: true,
          },
          {
            name: "link",
            label: {
              en: "URL",
            },
            type: "text",
            admin: {
              description: () =>
                "YouTube playlist URL e.g https://www.youtube.com/watch?list=<id> or https://www.youtube.com/playlist?list=<id>",
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
      {
        name: "featured",
        type: "group",
        fields: [
          {
            name: "featuredType",
            label: {
              en: "Show",
              ft: "Afficher",
              pt: "Mostrar",
            },
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
                  en: "Custom selection",
                  fr: "Sélection personnalisée",
                  pt: "Seleção personalizada",
                },
                value: "custom",
              },
              {
                label: {
                  en: "None",
                  ft: "Aucun",
                  pt: "Nenhum",
                },
                value: "none",
              },
            ],
            defaultValue: "latest",
          },
          {
            name: "items",
            label: { en: "Video(s)", fr: "Vidéo(s)", pt: "Vídeo(s)" },
            type: "select",
            hasMany: true,
            // These are just dummy options, YouTubeSelect loads (id, title)
            // pairs from the playlist link provided above.
            options: ["-"],
            required: true,
            validate: (value, props) =>
              validateYouTubeSelect(value, props, slug),
            admin: {
              description: () =>
                "Enter playlist URL above to select an audio/video",
              components: {
                Field: (props) =>
                  createElement(YouTubeSelect, { slug, ...props }),
              },
              condition: (_, siblingData) =>
                siblingData?.featuredType === "custom",
            },
          },
        ],
        admin: {
          hideGutter: true,
        },
      },
    ],
  };
}
