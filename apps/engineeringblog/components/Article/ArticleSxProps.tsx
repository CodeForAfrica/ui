import type { SxProps, Theme } from "@mui/material/styles";

import { ArticleProps } from "@/engineeringblog/utils";

interface ArticleSxProps extends ArticleProps {
  sx?: SxProps<Theme>;
}

export type { ArticleSxProps };
