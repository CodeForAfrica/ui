import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";

const HeroTextRoot = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "311px",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "478.2px",
  },
}));

const Heading = styled(RichTypography)(({ theme }) => ({
  "& .highlight": {
    color: theme.palette.primary.main,
  },
}));

const Message = styled(RichTypography)(({ theme }) => ({
  backgroundColor: theme.palette.highlight.main,
  color: theme.palette.text.secondary,
  padding: "10px",
  width: "max-content",
  [theme.breakpoints.up("sm")]: {
    padding: "10px 30px",
  },
}));

const HeroFigure = React.forwardRef(function HeroFigure(props, ref) {
  const { title, subtitle, message } = props;

  if (!(title && message)) {
    return null;
  }
  return (
    <HeroTextRoot ref={ref}>
      <Heading
        variant="h2"
        sx={{ mt: 2.5, typography: { xs: "h4", md: "h2" } }}
      >
        {title}
      </Heading>
      <Message
        component="h1"
        sx={{ mt: 2.5, typography: { xs: "h3", md: "h1" } }}
      >
        {message}
      </Message>
      <RichTypography
        variant="subheading"
        sx={{ mt: 2.5, typography: { xs: "body3", md: "subheading" } }}
      >
        {subtitle}
      </RichTypography>
    </HeroTextRoot>
  );
});

export default HeroFigure;
