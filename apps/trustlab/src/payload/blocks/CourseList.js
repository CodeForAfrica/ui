import { linkGroup, richText, image } from "@/commons-ui/payload/fields";

const CourseList = {
  slug: "course-list",
  imageURL: "/images/cms/blocks/course-list.png",
  imageAltText: "Course List",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    richText({
      name: "description",
      localized: true,
      required: true,
    }),
    {
      name: "courses",
      type: "array",
      fields: [
        image({
          name: "image",
          required: true,
          label: { en: "Image" },
        }),
        {
          name: "title",
          type: "text",
          required: true,
        },
        richText({
          name: "description",
          localized: true,
          required: true,
        }),
        linkGroup({
          overrides: {
            name: "link",
            label: "Course Link",
            required: false,
          },
        }),
      ],
      minRows: 1,
    },
  ],
};

export default CourseList;
