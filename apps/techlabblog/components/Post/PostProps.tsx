import type { SxProps, Theme } from "@mui/material/styles";

import { Post } from "@/techlabblog/lib/data";

interface PostProps extends Post {
  sx?: SxProps<Theme>;
}

export type { PostProps };
