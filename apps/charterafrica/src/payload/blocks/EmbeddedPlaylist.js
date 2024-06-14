import { slateEditor } from "@payloadcms/richtext-slate";

import richText from "../fields/richText";
import youtubePlaylistSelect from "../fields/youtubeSelect/youtubePlaylistSelect";
import { BLOCK_SLUG } from "../utils/embeddedPlaylist";

const EmbeddedPlaylist = {
    slug: BLOCK_SLUG,
    labels: {
        singular: {
            en: "Embedded Playlist",
            fr: "Playlist Intégrée",
            pt: "Playlists incorporada"
        },
        plural: {
            en: "Embedded Playlist",
            fr: "Playlist Intégrée",
            pt: "Playlists incorporada"
        }
    },
    fields: [
        {
            type: "collapsible",
            label: {
                en: "Title & Description",
                fr: "Titre & description",
                pt: "Titulo & descrição"
            },
            fields: [
                {
                    name: "title",
                    label: {
                        en: "Title",
                        fr: "Titre",
                        pt: "Título"
                    },
                    type: "text",
                    localized: true
                },
                richText({
                    name: "description",
                    label: {
                        en: "Description",
                        fr: "La description",
                        pt: "Descrição"
                    },
                    localized: true,
                    editor: slateEditor({
                        admin: {
                            elements: ["h3", "h4", "h5", "h6", "link", "ol", "ul", "indent"],
                            leaves: ["bold", "code", "italic", "underline"]
                        }
                    })
                })
            ]
        },
        youtubePlaylistSelect(BLOCK_SLUG)
    ]
};

export default EmbeddedPlaylist;
