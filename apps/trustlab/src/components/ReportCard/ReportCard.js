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
    overview,
    link,
    actionLabel = "Download Report",
    condensed = false,
    date = "Jul 28, 2025",
    sx,
    file,
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
        {overview && !condensed && (
          <>
            <LexicalRichText
              elements={overview}
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
              sx={{
                height: 100,
                overflow: "hidden",
              }}
            />
            <Divider sx={{ my: 2 }} />
            {/* TODO: Remove link?.href integration is done */}
            <Box
              href={file?.url}
              component={file?.url ? Link : "div"}
              // download file.url
              download={file?.url ? file.url : undefined}
              sx={{
                textDecoration: "none",
                lineHeight: "16px",
                cursor: "pointer",
              }}
            >
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
            </Box>
          </>
        )}
        {overview && condensed && (
          <Box>
            <LexicalRichText
              elements={overview}
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
              sx={{
                height: 60,
                overflow: "hidden",
              }}
            />

            <Box
              href={link?.href}
              component={link?.href ? Link : "div"}
              sx={{ textDecoration: "none", lineHeight: "16px" }}
            >
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
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
});

export default ReportCard;
