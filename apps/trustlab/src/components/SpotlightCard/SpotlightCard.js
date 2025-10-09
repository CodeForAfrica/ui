import { Link } from "@commons-ui/next";
import { Button, Card, CardMedia } from "@mui/material";

function SpotlightCard(props) {
  const { title, image, buttonLink } = props;
  return (
    <Card
      sx={{
        width: "100%",
        height: 200,
        maxWidth: { xs: "100%", sm: 370 },
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
          maxHeight: 200,
          maxWidth: 350,
          objectFit: "cover",
          borderRadius: "10px",
          display: "block",
        }}
      />
      <Button
        component={buttonLink?.href ? Link : undefined}
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
          fontWeight: 700,
        }}
        href={buttonLink?.href}
      >
        {buttonLink?.label}
      </Button>
    </Card>
  );
}

export default SpotlightCard;
