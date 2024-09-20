import type { SxProps, Theme } from "@mui/material/styles";

import { ArticleProps } from "@/techlabblog/lib/data";

interface ArticleSxProps extends ArticleProps {
  sx?: SxProps<Theme>;
}

export type { ArticleSxProps };
