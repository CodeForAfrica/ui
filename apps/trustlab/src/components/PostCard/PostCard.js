import Card from "@/trustlab/components/Card";

function PostCard({
  deadline,
  deadlineLabel,
  excerpt,
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
      linkLabel={linkLabel}
      sx={{
        padding: 2,
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
          flexDirection: "column",
          alignItems: "flex-start",
          "& .MuiButton-root": {
            width: "fit-content",
          },
        },
      }}
    />
  );
}

export default PostCard;
