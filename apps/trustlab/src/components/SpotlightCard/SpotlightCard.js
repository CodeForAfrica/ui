import { Link } from "@commons-ui/next";
import { Button, Card, CardMedia } from "@mui/material";

function SpotlightCard(props) {
  const { title, image, buttonLink } = props;
  const { href, label: linkLabel } = buttonLink || {};
  return (
    <Card
      sx={{
        width: "100%",
        height: 220,
        maxWidth: { xs: "100%", sm: 350 },
        minWidth: 300,
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
        src={image?.src}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          display: "block",
          filter: "grayscale(100%)",
        }}
      />
      <Button
        component={href ? Link : undefined}
        sx={{
          backgroundColor: "#FFDE59",
          py: 0.75,
          px: 2,
          color: "#000",
          border: "2px solid #000",
          position: "absolute",
          bottom: 16,
          right: 16,
          minWidth: "106px",
          textDecoration: "none",
          textTransform: "none",
        }}
        href={href}
      >
        {linkLabel}
      </Button>
    </Card>
  );
}

export default SpotlightCard;
