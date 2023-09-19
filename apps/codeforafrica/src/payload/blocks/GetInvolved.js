import impact from "../fields/impact";

const GetInvolved = {
  slug: "get-involved",
  imageURL: "/images/cms/blocks/get_involved.jpg",
  imageAltText: "Our Impact Statisctics",
  fields: [
    impact({
      minRows: 3,
    }),
  ],
};

export default GetInvolved;
