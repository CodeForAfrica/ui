import Card from "@/trustlab/components/Card";

function PostCard({
  closedLabel,
  deadline,
  dateLabel,
  excerpt,
  isClosed,
  href,
  image,
  linkLabel,
  title,
  publishedOn,
}) {
  return (
    <Card
      title={title}
      media={image}
      dateLabel={dateLabel}
      date={deadline || publishedOn}
      description={excerpt}
      link={href}
      linkLabel={isClosed ? closedLabel : linkLabel}
      sx={{
        padding: 2,
        height: dateLabel ? 548 : 456,
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
      CardMediaProps={{
        sx: {
          height: 170,
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
          flexDirection: "column",
          alignItems: "flex-start",
          "& .MuiButton-root": {
            width: "fit-content",
          },
        },
      }}
      LinkProps={{
        disabled: isClosed,
      }}
    />
  );
}

export default PostCard;
