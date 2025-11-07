import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";

const ReportCard = forwardRef(function ReportCard(props, ref) {
  const {
    image,
    title,
    description,
    link,
    actionLabel = "Download Report",
    condensed = false,
    date = "Jul 28, 2025",
    sx,
    ...other
  } = props;

  return (
    <Card
      ref={ref}
      elevation={0}
      sx={[{ borderRadius: "5px", p: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      {image?.src && !condensed && (
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
      <CardContent
        sx={{ pb: "16px !important", px: image?.src && !condensed ? 0 : 2 }}
      >
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: "#828499",
            my: 2,
          }}
        >
          {date}
        </Typography>
        {description && !condensed && (
          <>
            <LexicalRichText
              elements={description}
              TypographyProps={{
                variant: "body2",
                component: "span",
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
            <Divider sx={{ my: 2 }} />
            <Link href="/" sx={{ textDecoration: "none", lineHeight: "16px" }}>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                  color: "#1020E1",
                  textDecoration: "none",
                  lineHeight: "16px",
                }}
                variant="caption"
              >
                {actionLabel}
              </Typography>
            </Link>
          </>
        )}
        {description && condensed && (
          <Box>
            <LexicalRichText
              elements={description}
              TypographyProps={{
                variant: "body2",
                component: "span",
                sx: {
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                  height: 60,
                },
              }}
            />

            <Link href="/" sx={{ textDecoration: "none", lineHeight: "16px" }}>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                  color: "#1020E1",
                  textDecoration: "none",
                  lineHeight: "16px",
                }}
                variant="caption"
              >
                {actionLabel}
              </Typography>
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
});

export default ReportCard;
