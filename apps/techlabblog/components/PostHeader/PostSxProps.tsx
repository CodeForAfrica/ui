import type { SxProps, Theme } from "@mui/material/styles";

import { Post } from "@/techlabblog/lib/data";

interface PostSxProps extends Post {
  sx?: SxProps<Theme>;
}

export type { PostSxProps };
