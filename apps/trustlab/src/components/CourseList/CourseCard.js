import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const CourseCard = React.forwardRef(function CourseCard(props, ref) {
  const { image, title, description, link, ...other } = props;

  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: "none",
        border: "none",
        display: "inline-block",
        maxWidth: { xs: "100%", sm: 400 },
        width: "100%",
        backgroundColor: "transparent",
        textDecoration: "none",
      }}
      component={link?.href ? Link : "div"}
      href={link?.href}
      {...other}
    >
      <CardMedia
        image={image.src}
        title={title}
        {...image}
        sx={[
          {
            height: 200,
            width: "100%",
            position: "relative",
            border: "1px solid",
            borderRadius: "10px",
            filter: "grayscale(100%)",
            pb: "0 !important",
            ...image?.sx,
          },
        ]}
      />
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ textTransform: "uppercase" }}
          noWrap
        >
          {title}
        </Typography>
        <LexicalRichText
          elements={description}
          TypographyProps={{
            gutterBottom: true,
            variant: "p3",
            sx: {
              mb: 0,
              textDecoration: "none",
              color: "#1F2937",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
      </CardContent>
      <div />
    </Card>
  );
});

export default CourseCard;
