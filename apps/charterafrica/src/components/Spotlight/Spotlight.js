import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import CardActionAction from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
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
          {items.map(({ category, item }) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              container
              direction="column"
              alignItems="center"
              key={item.title}
            >
              <LineClampedRichTypography
                color="neutral.dark"
                html={false}
                textTransform="uppercase"
                textAlign="center"
                typography={{ md: "h5" }}
                variant="h5Small"
                fontWeight={{ xs: 400, md: 400 }}
                mb={{ xs: 1.25, sm: 2.5 }}
              >
                {category}
              </LineClampedRichTypography>
              <SpotlightCard sx={{ borderColor: secondary[50] }}>
                <CardActionAction
                  href={item.link?.href}
                  component={item.link?.href ? Link : undefined}
                >
                  <Box
                    display="flex"
                    flexDirection={{ xs: "row", sm: "column" }}
                    gap={{ xs: 2.5, sm: 0 }}
                    p={{ xs: 1.25, sm: 0 }}
                  >
                    <CardMedia
                      alt={item.title}
                      component="img"
                      src={item.image.src}
                      sx={{
                        height: {
                          xs: "132px",
                          md: "147px",
                        },
                        width: {
                          xs: "100%",
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
                          minHeight: `calc(${theme.typography.h5Small.fontSize}px*${theme.typography.h2Small.lineHeight})`,
                          [theme.breakpoints.up("sm")]: {
                            minHeight: `calc(${theme.typography.h5Small.fontSize}px*${theme.typography.h2Small.lineHeight}*2)`,
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
                        color={neutral[900]}
                        lineClamp={1}
                        textTransform="uppercase"
                        variant="caption"
                      >
                        {item.topic}
                      </LineClampedRichTypography>
                      <LineClampedRichTypography
                        color={neutral[500]}
                        lineClamp={3}
                        variant="p1"
                      >
                        {item.excerpt}
                      </LineClampedRichTypography>
                      <LineClampedRichTypography
                        color={neutral[900]}
                        lineClamp={1}
                        variant="caption"
                      >
                        {item.date}
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
