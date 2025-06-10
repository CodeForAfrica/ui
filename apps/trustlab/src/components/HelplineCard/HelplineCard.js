import { neutral } from "@/trustlab/colors";
import Card from "@/trustlab/components/Card";

function HelplineCard({ title, media, description, slug, linkLabel }) {
  return (
    <Card
      title={title}
      media={media}
      description={description}
      link={`/resources/${slug}`}
      linkLabel={linkLabel}
      CardProps={{
        sx: {
          borderColor: neutral[300],
          padding: 2,
        },
      }}
      CardHeaderProps={{
        sx: {
          px: 0,
        },
      }}
      CardContentProps={{
        sx: {
          px: 0,
        },
      }}
      TitleProps={{
        sx: {
          textAlign: "center",
        },
      }}
      DescriptionProps={{
        variant: "p1",
        sx: {},
      }}
      CardActionsProps={{
        sx: {
          p: 0,
        },
      }}
    />
  );
}

export default HelplineCard;
