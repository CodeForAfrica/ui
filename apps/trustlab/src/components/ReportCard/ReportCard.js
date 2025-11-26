import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  CardActions,
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
    date,
    sx,
    file,
    ...other
  } = props;

  return (
    <Box
      sx={[
        {
          borderRadius: "5px",
          img: {
            filter: "grayscale(100%)",
          },
          "&:hover img": {
            filter: "grayscale(0%)",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      ref={ref}
    >
      <Box
        component={link?.href ? Link : "div"}
        href={link?.href}
        sx={{ textDecoration: "none", display: "block" }}
      >
        <Card
          elevation={0}
          sx={[{ borderRadius: "5px", p: 0, background: "transparent" }]}
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
            sx={{ pb: "0px !important", px: image?.src && !condensed ? 0 : 2 }}
          >
            <Typography
              variant="h3"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineClamp: 2,
                height: "48px",
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="caption"
              component="div"
              sx={{
                color: "#828499",
                my: 1.25,
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
                      height: 196,
                    },
                  }}
                  sx={{
                    height: 196,
                    overflow: "hidden",
                  }}
                />
                <Divider sx={{ my: 2 }} />
              </>
            )}

            {overview && condensed && (
              <LexicalRichText
                elements={overview}
                TypographyProps={{
                  variant: "body2",
                  component: "span",
                  sx: {
                    display: "-webkit-box",
                    WebkitLineClamp: 7,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: 1,
                    height: 140,
                  },
                }}
                sx={{
                  height: 140,
                  overflow: "hidden",
                }}
              />
            )}
          </CardContent>
        </Card>
      </Box>

      <CardActions sx={{ px: image?.src && !condensed ? 0 : 2, pt: 0 }}>
        <Box
          href={file?.url}
          component={file?.url ? Link : "div"}
          sx={{
            textDecoration: "none",
            lineHeight: "16px",
            cursor: file?.url ? "pointer" : "default",
            mt: condensed ? 1 : 0,
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
      </CardActions>
    </Box>
  );
});

export default ReportCard;
