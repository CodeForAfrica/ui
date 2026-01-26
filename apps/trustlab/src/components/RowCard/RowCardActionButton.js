import { Link } from "@commons-ui/next";
import { Box, Button } from "@mui/material";

function RowCardActionButton({
  link,
  hasEmbed,
  actionLabel,
  buttonLabel,
  onOpen,
}) {
  if (!link?.href && !hasEmbed) {
    return null;
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        name={actionLabel}
        component={!hasEmbed && link?.href ? Link : "button"}
        href={!hasEmbed ? link?.href : undefined}
        onClick={hasEmbed ? onOpen : undefined}
        sx={{
          backgroundColor: "#FFDE59",
          color: "#000",
          border: "2px solid #000",
          textTransform: "none",
          fontWeight: 700,
          "&:hover": { backgroundColor: "#ffe989" },
        }}
      >
        {hasEmbed ? buttonLabel : actionLabel}
      </Button>
    </Box>
  );
}

export default RowCardActionButton;
