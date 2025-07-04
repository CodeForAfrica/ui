import Card from "@/trustlab/components/Card";

function PostCard({
  closedLabel,
  deadline,
  deadlineLabel,
  excerpt,
  isClosed,
  href,
  image,
  linkLabel,
  title,
}) {
  return (
    <Card
      title={title}
      media={image}
      deadlineLabel={deadlineLabel}
      deadline={deadline}
      description={excerpt}
      link={href}
      linkLabel={isClosed ? closedLabel : linkLabel}
      sx={{
        padding: 2,
        height: 548,
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
