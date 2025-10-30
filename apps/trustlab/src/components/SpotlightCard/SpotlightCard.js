import { Link } from "@commons-ui/next";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";

function SpotlightCard(props) {
  const { title, image, buttonLink, cardTitle } = props;
  console.log(cardTitle);
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
          maxWidth: 370,
          objectFit: "cover",
          borderRadius: "10px",
          display: "block",
        }}
      />
      {cardTitle ? (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "10px",
            px: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {cardTitle}
          </Typography>
        </Box>
      ) : null}
      {buttonLink?.label ? (
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
      ) : null}
    </Card>
  );
}

export default SpotlightCard;
