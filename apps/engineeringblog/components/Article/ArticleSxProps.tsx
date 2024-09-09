import { SxProps } from "@mui/material/styles";

import { ArticleProps } from "@/engineeringblog/utils";

interface ArticleSxProps extends ArticleProps {
  sx?: SxProps;
}

export type { ArticleSxProps };
