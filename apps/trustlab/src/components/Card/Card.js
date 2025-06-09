import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Typography,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
} from "@mui/material";

function Card({ title, media, tag, description, link, linkLabel }) {
  return (
    <MuiCard
      raised
      sx={{
        width: 380,
        maxWidth: 380,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 0,
      }}
    >
      <CardMedia
        image={media.src}
        title={title}
        sx={{
          height: 270,
          position: "relative",
        }}
      >
        {tag && (
          <Box
            sx={{
              backgroundColor: "common.black",
              opacity: 0.8,
              bottom: 0,
              right: 0,
              left: 0,
              height: 70,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              pl: 2.5,
            }}
          >
            <Typography
              variant="button"
              sx={{
                color: "common.white",
              }}
            >
              {tag}
            </Typography>
          </Box>
        )}
      </CardMedia>
      <CardHeader title={<Typography variant="h2">{title}</Typography>} />
      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <LexicalRichText
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": "3",
            "-webkit-box-orient": "vertical",
          }}
          elements={description}
        />
      </CardContent>
      <CardActions>
        <Button
          href={link}
          component={Link}
          size="small"
          variant="contained"
          sx={{
            width: "100%",
          }}
        >
          {linkLabel}
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
