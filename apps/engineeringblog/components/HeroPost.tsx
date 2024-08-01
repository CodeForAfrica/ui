import { FunctionComponent, PropsWithChildren } from "react";
import { Post } from "../interfaces/post";
import { Box, Container, Paper } from "@mui/material";

interface Props {
  post: Post;
}

export default function HeroPost({ post }: Props) {
  return (
    <Container sx={{ my: 4 }}>
      <Paper elevation={1}>
        <Box sx={{ bgcolor: "#cfe8fc", height: "50vh" }} />
      </Paper>
    </Container>
  );
}
