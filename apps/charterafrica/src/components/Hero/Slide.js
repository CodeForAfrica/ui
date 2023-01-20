import Figure from "@/commons-ui/next/Figure";
import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
            html
            component="h1"
            elements={title.content || title}
            textAlign="center"
            typography={{ md: "display2" }}
            variant="h2Small"
            sx={() => ({
              color: title?.color,
              minHeight: `calc(${theme.typography.h2Small.fontSize}px*${theme.typography.h2Small.lineHeight}*3)`,
              "&>i": {
                color: "secondary.main",
                fontStyle: "normal",
              },
              [theme.breakpoints.up("sm")]: {
                minHeight: `calc(${theme.typography.h2Small.fontSize}px*${theme.typography.h2Small.lineHeight}*2)`,
              },
              [theme.breakpoints.up("md")]: {
                typography: "display2",
                minHeight: `calc(${theme.typography.display2.fontSize}px*${theme.typography.display2.lineHeight}*2)`,
              },
            })}
          />
          {/* <LineClampedRichTypography
            component="h1"
            lineClamp={{ xs: "3", sm: "2" }}
            textAlign="center"
            typography={{ md: "display2" }}
            variant="h2Small"
            sx={() => ({
              color: title?.color,
              minHeight: `calc(${theme.typography.h2Small.fontSize}px*${theme.typography.h2Small.lineHeight}*3)`,
              "&>i": {
                color: "secondary.main",
                fontStyle: "normal",
              },
              [theme.breakpoints.up("sm")]: {
                minHeight: `calc(${theme.typography.h2Small.fontSize}px*${theme.typography.h2Small.lineHeight}*2)`,
              },
              [theme.breakpoints.up("md")]: {
                typography: "display2",
                minHeight: `calc(${theme.typography.display2.fontSize}px*${theme.typography.display2.lineHeight}*2)`,
              },
            })}
          >
            {title?.content || title}
          </LineClampedRichTypography> */}
          <LineClampedRichTypography
            lineClamp={{ xs: "2", sm: "1" }}
            mt="30px"
            textAlign="center"
            variant="p1"
            lineHeight
            sx={() => ({
              color: subheading?.color,
              minHeight: `calc(${theme.typography.p1.fontSize}px*${theme.typography.p1.lineHeight}*2)`,
              [theme.breakpoints.up("sm")]: {
                minHeight: `calc(${theme.typography.p1.fontSize}px*${theme.typography.p1.lineHeight})`,
              },
              [theme.breakpoints.up("md")]: {
                typography: "subheading",
                minHeight: `calc(${theme.typography.subheading.fontSize}px*${theme.typography.subheading.lineHeight}*2)`,
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
