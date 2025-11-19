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

const ResearchCategoryCard = forwardRef(
  function ResearchCategoryCard(props, ref) {
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
          img: {
            filter: "grayscale(100%)",
          },
          "&:hover img": {
            filter: "grayscale(0%)",
          },
        }}
        {...other}
      >
        {image?.src && (
          <CardMedia
            component="img"
            image={image.src}
            alt={image.alt ?? title}
            sx={{
              borderRadius: "10px",
              objectFit: "cover",
              height: 200,
            }}
          />
        )}
        <CardContent sx={{ p: 0, mt: 2, textDecoration: "none" }}>
          <Typography sx={{ mt: 1.25, mb: 2 }} variant="h3" gutterBottom>
            {title}
          </Typography>
          {description && (
            <LexicalRichText
              elements={description}
              TypographyProps={{
                variant: "body2",
                sx: {
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                  height: 100,
                },
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
  },
);

export default ResearchCategoryCard;
