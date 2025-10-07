import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Typography,
  Button,
} from "@mui/material";

function HelplineCard({ title, icon: media, description, link }) {
  return (
    <Card elevation={0} gap={2} key={title}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 0 }}
      >
        <CardMedia
          component="img"
          image={media?.url}
          alt={media?.alt}
          sx={{
            height: { xs: "108px", md: "180px" },
            width: { xs: "108px", md: "180px" },
          }}
        />
      </Box>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ width: "100%" }}>
          <Divider
            sx={{
              background: "black",
              my: 2,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
          <Divider
            sx={{
              background: "black",
              my: 2,
            }}
          />
        </Box>
        <LexicalRichText
          elements={description}
          TypographyProps={{
            gutterBottom: true,
            variant: "p2",
            sx: {
              mb: 0,
              textDecoration: "none",
            },
          }}
        />
      </CardContent>
      <CardActions sx={{ p: 0 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          component={link?.href ? Link : "button"}
          href={link?.href}
          sx={{
            mt: 2,
            alignSelf: "start",
            backgroundColor: "#FFDE59",
            color: "black",
            height: 32,
            border: "2px solid black",
            fontSize: 16,
            fontWeight: 600,
            textTransform: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#FFDE59",
              border: "2px solid black",
            },
          }}
        >
          {link?.label}
        </Button>
      </CardActions>
    </Card>
  );
}

export default HelplineCard;
