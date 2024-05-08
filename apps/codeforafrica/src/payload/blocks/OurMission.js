import { slateEditor } from "@payloadcms/richtext-slate";

import richText from "../fields/richText";

const OurMission = {
  slug: "our-mission",
  imageURL: "/images/cms/blocks/our_mission.jpg",
  imageAltText: "Our mission",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
      required: true,
      editor: slateEditor({
        admin: {
          elements: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "link",
            "ol",
            "ul",
            "indent",
          ],
        },
      }),
    }),
  ],
};

export default OurMission;
