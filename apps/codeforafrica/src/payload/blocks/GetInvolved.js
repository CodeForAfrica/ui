import impacts from "../fields/impacts";
import link from "../fields/links/link";

const GetInvolved = {
  slug: "get-involved",
  imageURL: "/images/cms/blocks/get_involved.jpg",
  imageAltText: "Our Impact Statisctics",
  fields: [
    impacts({
      minRows: 3,
    }),
    {
      name: "action",
      label: "Action",
      type: "group",
      fields: [link()],
    },
  ],
};

export default GetInvolved;