import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../fields/image";
import linkGroup from "../fields/links/linkGroup";
import richText from "../fields/richText";

const MeetOurTeam = {
  slug: "meet-our-team",
  imageURL: "/images/cms/blocks/meet_our_team.jpg",
  imageAltText: "Display Team Call to Action",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
      required: true,
      editor: slateEditor({}),
    }),
    linkGroup({ overrides: { name: "action", label: "Action" } }),
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default MeetOurTeam;
