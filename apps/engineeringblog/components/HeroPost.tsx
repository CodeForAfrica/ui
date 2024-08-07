import { Post } from "@/lib/interfaces/post";
import { Avatar, Box, Chip, Container, Divider, Paper } from "@mui/material";

interface Props {
  post: Post;
}

export default function HeroPost({ post }: Props) {
  return (
    <Container sx={{ mt: 8 }}>
      <Paper elevation={4}>
        <Box sx={{ height: "50vh" }}>
          <Box
            sx={{
              height: "100%",
              borderRadius: "4px",
              backgroundImage: `url(${post.previewImage.image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          />
        </Box>
        <Box paddingX={4}>
          <Box>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box>
            {post.authors.map((author) => (
              <>
                <Avatar alt={author.image.alt} src={author.image.image.src} />
                <span>{author.name}</span>
              </>
            ))}
          </Box>
          <Box sx={{ pb: 4, display: "flex", gap: 1 }}>
            {Array.from(post.tags).map((tag) => (
              <Chip label={tag} component="a" href={`/category/${tag}`} />
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
