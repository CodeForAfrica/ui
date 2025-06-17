import Card from "@/trustlab/components/Card";

function HelplineCard({ title, media, excerpt, link, linkLabel }) {
  return (
    <Card
      title={title}
      media={media}
      description={excerpt}
      link={link}
      linkLabel={linkLabel}
      CardProps={{
        sx: {
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
      CardActionsProps={{
        sx: {
          p: 0,
        },
      }}
    />
  );
}

export default HelplineCard;
