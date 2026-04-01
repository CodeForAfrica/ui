import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { forwardRef, useState } from "react";

const OpportunityCard = forwardRef(function OpportunityCard(props, ref) {
  const {
    image,
    title,
    description,
    link,
    caption,
    location,
    date,
    viewMoreLabel = "View more",
    viewLessLabel = "View less",
    ...other
  } = props;

  const [expanded, setExpanded] = useState(false);
  const locationDateText = [location, date].filter(Boolean).join(" | ");

  const handleToggleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

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
              objectFit: "cover",
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
          "&:last-child": { pb: 0 },
        }}
      >
        <Typography sx={{ my: 1 }} variant="h3" gutterBottom>
          {title}
        </Typography>

        {caption && (
          <Typography variant="p2" sx={{ color: "#828499", mb: 1.5 }}>
            {caption}
          </Typography>
        )}

        {locationDateText && (
          <Box display="flex" sx={{ mb: 1.5 }} alignItems="center" gap="4px">
            <Typography
              variant="p2"
              sx={{ mt: caption ? 0.5 : 0, color: "common.black" }}
            >
              {location}
            </Typography>
            |
            <Typography
              variant="p2"
              sx={{ mt: caption ? 0.5 : 0, color: "#828499" }}
            >
              {date}
            </Typography>
          </Box>
        )}
        {description && (
          <Box>
            <Box
              sx={{
                ...(!expanded && {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }),
              }}
            >
              <LexicalRichText
                elements={description}
                TypographyProps={{
                  variant: "p2",
                  component: "span",
                }}
              />
            </Box>
            {viewMoreLabel && (
              <Typography
                component="button"
                variant="p2"
                onClick={handleToggleExpand}
                sx={{
                  textDecoration: "none",
                  mt: 0.5,
                  display: "inline-block",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  font: "inherit",
                  color: "#1020E1",
                  fontWeight: 700,
                }}
              >
                {expanded ? viewLessLabel : viewMoreLabel}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
});

export default OpportunityCard;
