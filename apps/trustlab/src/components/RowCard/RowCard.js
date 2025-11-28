import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Card, CardMedia, Typography, Button, Stack } from "@mui/material";
import { forwardRef } from "react";

const RowCard = forwardRef(function RowCard(props, ref) {
  const {
    image,
    title,
    description,
    link,
    actionLabel = link?.label || "Learn More",
    sx,
    ...other
  } = props;

  return (
    <Card
      ref={ref}
      elevation={0}
      component={link?.href ? Link : "div"}
      href={link?.href}
      sx={[
        {
          textDecoration: "none",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: "8px",
          overflow: "hidden",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {image?.src && (
        <Box
          sx={{
            flexShrink: 0,
            width: 240,
            position: "relative",
            "& img": {
              objectFit: "contain",
              height: 220,
              display: "block",
            },
          }}
        >
          <CardMedia
            component="img"
            image={image.src}
            alt={image.alt ?? title}
            sx={{ height: 220 }}
          />
        </Box>
      )}
      <Stack
        spacing={2}
        sx={{
          flex: 1,
          p: { xs: 2, md: 3 },
        }}
      >
        {title && (
          <Typography variant="h3" component="h3" sx={{ m: 0 }}>
            {title}
          </Typography>
        )}
        {description && (
          <LexicalRichText
            elements={description}
            TypographyProps={{
              variant: "p2",
              sx: {
                color: "text.primary",
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
        )}
        {link?.href && (
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#FFDE59",
                color: "#000",
                border: "2px solid #000",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#ffe989" },
              }}
            >
              {actionLabel}
            </Button>
          </Box>
        )}
      </Stack>
    </Card>
  );
});

export default RowCard;
