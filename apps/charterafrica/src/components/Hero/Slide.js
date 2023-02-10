import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Box, Button, styled, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";

const SlideRoot = styled(Box, {
  shouldForwardProp: (prop) => !["background"].includes(prop),
})(({ background: backgroundProp, theme }) => {
  const backgroundColor = backgroundProp?.color || theme.palette.neutral.dark;
  const backgroundUrl = backgroundProp?.src
    ? `, ${backgroundColor} url("${backgroundProp.src}") center/cover`
    : "";
  const background = `linear-gradient(0deg, ${backgroundColor}, ${backgroundColor})${backgroundUrl}`;
  const backgroundBlendMode = backgroundProp?.blendMode;

  return {
    background,
    backgroundBlendMode,
  };
});

const Slide = React.forwardRef(function Slide(props, ref) {
  const { background, links, subheading, sx, title } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <SlideRoot
      alignItems="center"
      background={background}
      display="flex"
      flexDirection="column"
      gap={1.25}
      justifyContent="center"
      sx={sx}
      ref={ref}
    >
      <Section sx={{ px: { xs: 1.25, sm: 0 }, py: { xs: 5, md: "86px" } }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <RichText
            component="h1"
            elements={title.content}
            textAlign="center"
            typography={{ md: "display2" }}
            variant="h2Small"
            sx={(t) => ({
              color: title?.color,
              minHeight: `calc(${t.typography.h2Small.fontSize}px*${t.typography.h2Small.lineHeight}*3)`,
              whiteSpace: "pre-line",
              "& > em, & > strong": {
                color: "secondary.main",
                fontStyle: "normal",
              },
              [t.breakpoints.up("sm")]: {
                minHeight: `calc(${t.typography.h2Small.fontSize}px*${t.typography.h2Small.lineHeight}*2)`,
              },
              [t.breakpoints.up("md")]: {
                typography: "display2",
                minHeight: `calc(${t.typography.display2.fontSize}px*${t.typography.display2.lineHeight}*2)`,
              },
            })}
          />
          <LineClampedRichTypography
            lineClamp={{ xs: "2", sm: "1" }}
            mt="30px"
            textAlign="center"
            variant="p1"
            lineHeight
            sx={(t) => ({
              color: subheading?.color,
              minHeight: `calc(${t.typography.p1.fontSize}px*${t.typography.p1.lineHeight}*2)`,
              [t.breakpoints.up("sm")]: {
                minHeight: `calc(${t.typography.p1.fontSize}px*${t.typography.p1.lineHeight})`,
              },
              [t.breakpoints.up("md")]: {
                typography: "subheading",
                minHeight: `calc(${t.typography.subheading.fontSize}px*${t.typography.subheading.lineHeight}*2)`,
              },
            })}
          >
            {subheading?.content || subheading}
          </LineClampedRichTypography>
          {links.length > 0 ? (
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2.5}
              mt="30px"
              width={{ xs: "100%", sm: "auto" }}
            >
              {links.map((link) => (
                <Button
                  key={link?.content}
                  color={link?.color}
                  size={isDesktop ? "large" : "small"}
                  variant="contained"
                  startIcon={
                    <Figure
                      ImageProps={{ alt: link?.content, ...link?.icon }}
                      sx={{ height: 16, width: 16 }}
                    />
                  }
                >
                  {link?.content}
                </Button>
              ))}
            </Box>
          ) : null}
        </Box>
      </Section>
    </SlideRoot>
  );
});

export default Slide;
