import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import React from "react";

const ArticleCardRoot = styled(Card, {
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[ownerState.variant]];
  },
})(({ theme, ownerState }) => ({
  "&:hover": {
    ...(ownerState.variant === "outlined" && {
      border: `1px solid ${theme.palette.highlight.main}`,
      filter: "none",
    }),
  },
  ...(ownerState.variant === "outlined" && {
    border: "1px solid #DAD5D5",
    filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
  }),
}));

const ArticleCard = React.forwardRef(function ArticleCard(props, ref) {
  const {
    elevation = 0,
    square = true,
    variant = "outlined",
    ...other
  } = props;

  const ownerState = {
    ...other,
    elevation,
    square,
    variant,
  };

  return (
    <ArticleCardRoot
      elevation={elevation}
      square={square}
      variant={variant}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

export default ArticleCard;
