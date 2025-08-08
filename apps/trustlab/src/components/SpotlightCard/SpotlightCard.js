import { Link } from "@commons-ui/next";
import { Button, Card, CardMedia } from "@mui/material";

function SpotlightCard({ title, image, href, linkLabel = "Apply" }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: 220,
        maxWidth: { xs: "100%", sm: 350 },
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
        p: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        src={image.src}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          display: "block",
        }}
      />
      <Link
        href={href}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          textDecoration: "none",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#FFDE59",
            py: 0.75,
            px: 2,
            color: "#000",
            border: "2px solid #000",
          }}
        >
          {linkLabel}
        </Button>
      </Link>
    </Card>
  );
}

export default SpotlightCard;
