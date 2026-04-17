import { Section } from "@commons-ui/core";
import { Link, RichTypography } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid } from "@mui/material";
import { forwardRef } from "react";

const headingSx = {
  fontFamily: "Inter",
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "32px",
  letterSpacing: "0.07px",
  color: "#0A1628",
};

const bodySx = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  color: "#252B37",
};

const cardContainerSx = {
  backgroundColor: "#F0F0F5",
  border: "1px solid #E7E9FF",
  borderRadius: "10px",
  p: 3,
};

const cardTitleSx = {
  mb: 2,
  fontFamily: "Inter",
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "27px",
  letterSpacing: "-0.439px",
  color: "#0A1628",
};

const cardRichTextBodySx = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  color: "#3E4159",
};

const itemsGridSx = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  rowGap: 2,
  columnGap: 2,
};

const itemLabelSx = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "16px",
  letterSpacing: "0.6px",
  textTransform: "capitalize",
  color: "#3E4159",
  mb: 0.75,
};

const itemLinkSx = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  letterSpacing: "-0.15px",
  color: "#1020E1",
  textDecoration: "underline",
  display: "block",
};

const itemValueSx = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  letterSpacing: "-0.15px",
  color: "#3E4159",
};

const ContentOverview = forwardRef(function ContentOverview(props, ref) {
  const { card, content, date, location, title } = props;

  if (!(content && card)) {
    return null;
  }
  const { cardType, items, richContent, title: cardTitle } = card;
  // Seems like location and date are optional & we're introducing title as optional.
  const hasLocationDate = location?.length && date?.length;
  return (
    <Box sx={{ backgroundColor: "common.white" }} ref={ref}>
      <Section sx={{ py: 5, px: { xs: 2.5, sm: 0 } }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid
            size={{ xs: 12, sm: 6 }}
            container
            spacing={1}
            direction="column"
          >
            {title ? (
              <Grid>
                <RichTypography variant="h2" fontSize={26} lineHeight="29px">
                  {title}
                </RichTypography>
              </Grid>
            ) : null}
            {hasLocationDate ? (
              <Grid>
                <RichTypography component="span" variant="p2">
                  {location} |{" "}
                </RichTypography>
                <RichTypography
                  component="span"
                  variant="p2"
                  sx={{ color: "#828499" }}
                >
                  {date}
                </RichTypography>
              </Grid>
            ) : null}
            <Grid>
              <LexicalRichText
                elements={content}
                sx={{
                  "h1, h2, h3, h4, h5, h6": {
                    ...headingSx,
                    mb: 1,
                  },
                  p: { mb: 2 },
                }}
                TypographyProps={{
                  gutterBottom: true,
                  sx: bodySx,
                }}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={cardContainerSx}>
              <RichTypography variant="h3" sx={cardTitleSx}>
                {cardTitle}
              </RichTypography>

              {cardType === "richtext" ? (
                <LexicalRichText
                  elements={richContent}
                  sx={{ p: { mb: 1 } }}
                  TypographyProps={{
                    sx: cardRichTextBodySx,
                  }}
                />
              ) : (
                <Box sx={itemsGridSx}>
                  {items?.map((item, index) => (
                    <Box key={item.id ?? index}>
                      {item.fieldLabel ? (
                        <RichTypography sx={itemLabelSx}>
                          {item.fieldLabel}
                        </RichTypography>
                      ) : null}
                      {item.isLink && item.href ? (
                        <Box component={Link} href={item.href} sx={itemLinkSx}>
                          {item.label}
                        </Box>
                      ) : (
                        <RichTypography sx={itemValueSx}>
                          {item.value}
                        </RichTypography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default ContentOverview;
