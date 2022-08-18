import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";

const HeroTextRoot = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 375,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 553.2,
  },
}));

const Heading = styled(RichTypography)(({ theme }) => ({
  "& .highlight, & em, & strong": {
    color: theme.palette.primary.main,
  },
}));

const MessageHeader = styled(RichTypography)(({ theme }) => ({
  backgroundColor: theme.palette.highlight.main,
  color: theme.palette.text.secondary,
  height: 34 + 20, // h3 line-height + y padding
  overflow: "hidden",
  position: "relative",
  whiteSpace: "nowrap",
  [theme.breakpoints.up("md")]: {
    height: 56 + 20, // h1 line-height + padding
  },
}));

const MessageAnimation = styled("span")(({ theme }) => ({
  animation: "openclose 5s ease-in-out infinite",
  backgroundColor: theme.palette.highlight.main,
  display: "block",
  left: 0,
  overflow: "hidden",
  position: "absolute",
  top: 0,
  [theme.breakpoints.up("md")]: {
    animation: "opencloseDesktop 5s ease-in-out infinite",
  },

  "@keyframes openclose": {
    "0%": {
      top: 0,
      width: 0,
    },
    "5%": {
      width: 0,
    },
    "15%": {
      width: "100%",
    },
    "30%": {
      top: 0,
      width: "100%",
    },
    "33%": {
      top: 0,
      width: 0,
    },
    "35%": {
      top: 0,
      width: 0,
    },
    "38%": {
      top: "-54px",
    },
    "48%": {
      top: "-54px",
      width: "100%",
    },
    "62%": {
      top: "-54px",
      width: "100%",
    },
    "66%": {
      top: "-54px",
      width: 0,
    },
    "71%": {
      top: "-108px",
      width: 0,
    },
    "86%": {
      top: "-108px",
      width: "100%",
    },
    "95%": {
      top: "-108px",
      width: "100%",
    },
    "98%": {
      top: "-108px",
      width: 0,
    },
    "100%": {
      top: 0,
      width: 0,
    },
  },

  "@keyframes opencloseDesktop": {
    "0%": {
      top: 0,
      width: 0,
    },
    "5%": {
      width: 0,
    },
    "15%": {
      width: "100%",
    },
    "30%": {
      top: 0,
      width: "100%",
    },
    "33%": {
      top: 0,
      width: 0,
    },
    "35%": {
      top: 0,
      width: 0,
    },
    "38%": {
      top: "-76px",
    },
    "48%": {
      top: "-76px",
      width: "100%",
    },
    "62%": {
      top: "-76px",
      width: "100%",
    },
    "66%": {
      top: "-76px",
      width: 0,
    },
    "71%": {
      top: "-152px",
      width: 0,
    },
    "86%": {
      top: "-152px",
      width: "100%",
    },
    "95%": {
      top: "-152px",
      width: "100%",
    },
    "98%": {
      top: "-152px",
      width: 0,
    },
    "100%": {
      top: 0,
      width: 0,
    },
  },
}));

const Message = styled("span")(({ theme }) => ({
  display: "block",
  height: 34 + 20, // h3 line-height + padding
  padding: 10,
  [theme.breakpoints.up("sm")]: {
    padding: "10px 30px",
  },
  [theme.breakpoints.up("md")]: {
    height: 56 + 20, // h1 line-height + padding
  },
}));

const HeroFigure = React.forwardRef(function HeroFigure(props, ref) {
  const { messages, subtitle, sx, title } = props;

  if (!(title && messages?.length === 3)) {
    return null;
  }
  return (
    <HeroTextRoot sx={sx} ref={ref}>
      <Heading
        variant="h2"
        sx={{
          mt: 2.5,
          typography: { xs: "h4", md: "h2" },
          "& .hightlight, & em, & strong": {
            typography: { xs: "h4", md: "h2" },
          },
        }}
      >
        {title}
      </Heading>
      <MessageHeader
        component="h1"
        sx={{ mt: 2.5, typography: { xs: "h3", md: "h1" } }}
      >
        <MessageAnimation className="message">
          {messages.map((message) => (
            <Message key={message}>{message}</Message>
          ))}
        </MessageAnimation>
      </MessageHeader>
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
