import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";

const CategoryCard = forwardRef(function CategoryCard(props, ref) {
  const { image, title, description, link, ...other } = props;

  return (
    <Card
      component={link?.href ? Link : "div"}
      ref={ref}
      elevation={0}
      href={link?.href}
      sx={{
        textDecoration: "none",
        backgroundColor: "transparent",
        img: { filter: "grayscale(100%)" },
        "&:hover img": { filter: "grayscale(0%)" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      {...other}
    >
      {image?.src && (
        <Box
          sx={{
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
            "&:hover .overlay": { opacity: { xs: 0, sm: 1 } },
          }}
        >
          <CardMedia
            component="img"
            image={image.src}
            alt={image.alt ?? title}
            sx={{
              borderRadius: "10px",
              objectFit: { xs: "cover", sm: "contain", md: "cover" },
              height: { xs: 190, sm: 160, md: 220 },
            }}
          />
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              opacity: 0,
              transition: "opacity 200ms ease",
              pointerEvents: "none",
            }}
          />
        </Box>
      )}
      <CardContent
        sx={{
          p: 0,
          mt: 2,
          textDecoration: "none",
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ mt: 1.25, mb: 2 }} variant="h3" gutterBottom>
          {title}
        </Typography>
        {description && (
          <LexicalRichText
            elements={description}
            sx={{ flex: 1 }}
            TypographyProps={{
              variant: "p2",
            }}
          />
        )}
        {link?.href && (
          <Box sx={{ mt: 2 }}>
            <Button
              sx={{
                backgroundColor: "#FFDE59",
                py: 0.75,
                px: 2,
                color: "#000",
                border: "2px solid #000",
                minWidth: "106px",
                textDecoration: "none",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "6px",
              }}
            >
              {link.label || "Learn More"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
});

export default CategoryCard;
