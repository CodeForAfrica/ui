import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import {
  Box,
  CardActionArea as CardActionAction,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import SpotlightCard from "@/charterafrica/components/SpotlightCard";

const Spotlight = React.forwardRef(function Spotlight(props, ref) {
  const { title, items } = props;

  if (!items?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
      }}
      ref={ref}
    >
      <Section sx={{ px: { xs: "5px", sm: 0 }, py: { xs: 5, md: "41.5px" } }}>
        <LineClampedRichTypography
          color="neutral.dark"
          html={false}
          mb={{ xs: 2.5, md: 5 }}
          textAlign={{ xs: "center", sm: "left" }}
          typography={{ md: "h3" }}
          variant="h3Small"
        >
          {title}
        </LineClampedRichTypography>
        <Grid container spacing={{ xs: 1.25, md: 2.5 }}>
          {items.map(({ item }) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <SpotlightCard sx={{ borderColor: secondary[50] }}>
                <CardActionAction
                  href={item.link?.href}
                  component={item.link?.href ? Link : undefined}
                  sx={{
                    "&: hover": {
                      "& .MuiCardActionArea-focusHighlight": {
                        opacity: 0,
                      },
                    },
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection={{ xs: "row", md: "column" }}
                    gap={{ xs: 2.5, sm: 0 }}
                    p={{ xs: 1.25, sm: 0 }}
                  >
                    <CardMedia
                      alt={item.title}
                      component="img"
                      src={item.image.src}
                      sx={{
                        height: {
                          xs: "auto",
                          md: "147px",
                        },
                        width: {
                          xs: "122px",
                          md: "100%",
                        },
                      }}
                    />
                    <CardContent
                      component={Box}
                      display="flex"
                      flexDirection="column"
                      gap={{ xs: 1.24, sm: 2.5 }}
                      p={{ xs: 0, sm: 2.5 }}
                      sx={{
                        "&:last-child": { pb: { xs: 0, sm: 2.5 } },
                      }}
                    >
                      <LineClampedRichTypography
                        color={neutral[900]}
                        lineClamp={{ xs: 1, sm: 2 }}
                        variant="h5Small"
                        sx={(theme) => ({
                          fontWeight: 400,
                          minHeight: `calc(${theme.typography.h5Small.fontSize}px*${theme.typography.h5Small.lineHeight})`,
                          [theme.breakpoints.up("sm")]: {
                            minHeight: `calc(${theme.typography.h5Small.fontSize}px*${theme.typography.h5Small.lineHeight}*2)`,
                          },
                          [theme.breakpoints.up("md")]: {
                            typography: "h5",
                            fontWeight: 400,
                            minHeight: `calc(${theme.typography.h5.fontSize}px*${theme.typography.h5.lineHeight}*2)`,
                          },
                        })}
                      >
                        {item.title}
                      </LineClampedRichTypography>
                      <LineClampedRichTypography
                        color={neutral[500]}
                        lineClamp={5}
                        variant="p1"
                        sx={(theme) => ({
                          minHeight: `calc(${theme.typography.p1.fontSize}px*${theme.typography.p1.lineHeight}*5)`,
                        })}
                      >
                        {item.excerpt}
                      </LineClampedRichTypography>
                      <LineClampedRichTypography
                        alignItems="flex-end"
                        color={neutral[900]}
                        display="flex"
                        lineClamp={2}
                        textTransform="uppercase"
                        variant="caption"
                        sx={(theme) => ({
                          minHeight: `calc(${theme.typography.caption.fontSize}px*${theme.typography.caption.lineHeight}*2)`,
                        })}
                      >
                        {item.topic}
                      </LineClampedRichTypography>
                    </CardContent>
                  </Box>
                </CardActionAction>
              </SpotlightCard>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

export default Spotlight;
