import { Link } from "@commons-ui/next";

import Card from "@/trustlab/components/Card";

function SpotlightCard({ title, media, description, tag, link }) {
  return (
    <Card
      title={title}
      media={media}
      description={description}
      tag={tag}
      CardProps={{
        component: Link,
        href: link,
        sx: {
          borderColor: "common.white",
          width: {
            xs: "100%",
            md: 500,
            lg: 588,
          },
          maxWidth: {
            xs: "100%",
            md: 500,
            lg: 588,
          },
          backgroundColor: "common.black",
          color: "common.white",
          textDecoration: "none",
        },
      }}
      CardMediaProps={{
        sx: {
          filter: "grayscale(100%)",
          "&:hover": {
            filter: "none",
          },
        },
      }}
    />
  );
}

export default SpotlightCard;
