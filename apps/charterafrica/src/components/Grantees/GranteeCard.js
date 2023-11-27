import { Link } from "@commons-ui/next";
import { Box, Button, CardContent, CardMedia, Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const GranteeCard = React.forwardRef(function GranteeCard(props, ref) {
  const {
    description,
    image,
    name,
    sx,
    square,
    variant = "outlined",
    elevation,
    link,
    tags,
  } = props;
  const ownerState = {
    elevation,
    square,
    variant,
  };

  let ActionArea = Box;
  let ActionAreaProps = { sx: { p: 2.5 } };
  if (link?.href?.length) {
    ActionArea = StyledActionArea;
    ActionAreaProps = {
      ...ActionAreaProps,
      component: Link,
      href: link.href,
    };
  }

  return (
    <Card
      elevation={elevation}
      sx={sx}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
    >
      <ActionArea {...ActionAreaProps}>
        <CardMedia
          image={image.url}
          sx={{
            backgroundOrigin: "content-box",
            backgroundSize: "contain",
            height: { sm: 243, md: 264 },
          }}
        />
        <CardContent sx={{ p: 0, ":last-child": { p: 0 } }}>
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={2}
            textAlign="left"
            variant="h5"
            sx={(theme) => ({
              mb: 2.5,
              fontWeight: 400,
              minHeight: `calc(${theme.typography.h5.fontSize}px * ${theme.typography.h5.lineHeight} * 2)`,
            })}
          >
            {name}
          </LineClampedRichTypography>
          <RichText
            color={neutral[500]}
            elements={description}
            sx={(theme) => ({
              minHeight: `calc(${theme.typography.p1.fontSize}px * ${theme.typography.p1.lineHeight} * 3)`,
            })}
            lineClamp={3}
          />
          {tags?.length > 0 ? (
            <Stack
              spacing={1.25}
              sx={{
                minHeight: 74,
                maxHeight: 74,
                mt: 2.5,
                overflow: "hidden",
              }}
            >
              {tags.slice(0, 2).map((tag, i) => (
                <Button
                  component="div"
                  key={tag.id}
                  sx={{
                    color: "neutral.dark",
                    typography: "footerCap",
                    width: "fit-content",
                  }}
                  size="small"
                  variant="contained"
                  color={i ? "error" : "success"}
                >
                  {tag.name}
                </Button>
              ))}
            </Stack>
          ) : null}
        </CardContent>
      </ActionArea>
    </Card>
  );
});

GranteeCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.shape({}),
  tags: PropTypes.arrayOf(PropTypes.shape({})),
};

GranteeCard.defaultProps = {
  name: undefined,
  description: undefined,
  image: undefined,
  tags: undefined,
};

export default GranteeCard;
