import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Typography,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
} from "@mui/material";

import { neutral } from "@/trustlab/colors";

function Card({
  description,
  link,
  linkLabel,
  media,
  tag,
  title,
  DescriptionProps,
  CardProps,
  CardActionsProps,
  CardContentProps,
  CardHeaderProps,
  CardMediaProps,
  LinkProps,
  TagProps,
  TagTypographyProps,
  TitleProps,
}) {
  return (
    <MuiCard
      {...CardProps}
      sx={{
        width: {
          xs: "100%",
          md: 336,
        },
        maxWidth: {
          xs: "100%",
          md: 336,
        },
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 0,
        border: "1px solid",
        borderColor: neutral[300],
        ...CardProps?.sx,
      }}
    >
      <CardMedia
        image={media.src}
        title={title}
        {...CardMediaProps}
        sx={{
          height: 270,
          position: "relative",
          ...CardMediaProps?.sx,
        }}
      >
        {tag && (
          <Box
            component="div"
            {...TagProps}
            sx={{
              backgroundColor: "common.black",
              opacity: 0.8,
              bottom: 0,
              right: 0,
              left: 0,
              height: 70,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              pl: 2.5,
              ...TagProps?.sx,
            }}
          >
            <Typography
              variant="button"
              {...TagTypographyProps}
              sx={{
                color: "common.white",
                ...TagTypographyProps?.sx,
              }}
            >
              {tag}
            </Typography>
          </Box>
        )}
      </CardMedia>
      <CardHeader
        {...CardHeaderProps}
        title={
          <Typography variant="h2" {...TitleProps}>
            {title}
          </Typography>
        }
        sx={{
          px: 3,
          ...CardHeaderProps?.sx,
        }}
      />
      <CardContent
        {...CardContentProps}
        sx={{
          flexGrow: 1,
          px: 3,
          ...CardContentProps?.sx,
        }}
      >
        {typeof description === "string" ? (
          <Typography
            variant="body1"
            {...DescriptionProps}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
              ...DescriptionProps?.sx,
            }}
          >
            {description}
          </Typography>
        ) : (
          <LexicalRichText
            elements={description}
            {...DescriptionProps}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
              ...DescriptionProps?.sx,
            }}
          />
        )}
      </CardContent>
      {link && linkLabel && (
        <CardActions {...CardActionsProps}>
          <Button
            href={link}
            component={Link}
            size="small"
            variant="contained"
            {...LinkProps}
            sx={{
              width: "100%",
              ...LinkProps?.sx,
            }}
          >
            {linkLabel}
          </Button>
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
