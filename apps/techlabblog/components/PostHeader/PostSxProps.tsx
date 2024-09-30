import type { SxProps, Theme } from "@mui/material/styles";

import { PostFrontMatterProps } from "@/techlabblog/lib/data";

interface PostSxProps extends PostFrontMatterProps {
  sx?: SxProps<Theme>;
}

export type { PostSxProps };
