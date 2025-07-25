import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Typography,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Divider,
} from "@mui/material";

import { neutral } from "@/trustlab/colors";

function Card({
  date,
  dateLabel,
  description,
  link,
  linkLabel,
  media,
  sx,
  tag,
  title,
  DescriptionProps,
  CardActionsProps,
  CardContentProps,
  CardHeaderProps,
  CardMediaProps,
  LinkProps,
  TagProps,
  TitleProps,
  ...props
}) {
  return (
    <MuiCard
      {...props}
      sx={[
        {
          width: {
            xs: "100%",
            md: 336,
            lg: 384,
          },
          maxWidth: {
            xs: "100%",
            md: 336,
            lg: 384,
          },
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 0,
          border: "1px solid",
          borderColor: neutral[300],
          ...sx,
        },
      ]}
    >
      <CardMedia
        image={media.src}
        title={title}
        {...CardMediaProps}
        sx={[
          {
            height: 270,
            position: "relative",
            ...CardMediaProps?.sx,
          },
        ]}
      >
        {tag && (
          <Typography
            variant="button"
            {...TagProps}
            sx={[
              {
                backgroundColor: "common.black",
                opacity: 0.8,
                bottom: 0,
                right: 0,
                left: 0,
                height: 70,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                px: 3,
                color: "common.white",
                ...TagProps?.sx,
              },
            ]}
          >
            {tag}
          </Typography>
        )}
      </CardMedia>
      <CardHeader
        {...CardHeaderProps}
        title={
          <Typography variant="h2" {...TitleProps}>
            {title}
          </Typography>
        }
        sx={[
          {
            px: 3,
            ...CardHeaderProps?.sx,
          },
        ]}
      />
      <CardContent
        {...CardContentProps}
        sx={[
          {
            flexGrow: 1,
            px: 3,
            ...CardContentProps?.sx,
          },
        ]}
      >
        {typeof description === "string" ? (
          <Typography
            variant="p1"
            {...DescriptionProps}
            sx={[
              {
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                // NOTE(kilemensi): Using kebab-case for css properties in objects is not supported
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                ...DescriptionProps?.sx,
              },
            ]}
          >
            {description}
          </Typography>
        ) : (
          <LexicalRichText
            elements={description}
            {...DescriptionProps}
            sx={[
              {
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                ...DescriptionProps?.sx,
              },
            ]}
          />
        )}
      </CardContent>
      {link && linkLabel && (
        <CardActions
          {...CardActionsProps}
          sx={[
            {
              px: 3,
              ...CardActionsProps?.sx,
            },
          ]}
        >
          {dateLabel && (
            <>
              <Divider
                sx={[
                  {
                    border: "1px solid",
                    borderColor: "#7F7272",
                    width: "100%",
                  },
                ]}
              />
              <Typography
                variant="p1"
                sx={[
                  {
                    textTransform: "capitalize",
                    mb: 3,
                    mt: 1,
                    ml: "0 !important",
                  },
                ]}
              >
                {`${dateLabel} ${date}`}
              </Typography>
            </>
          )}
          <Button
            href={link}
            component={Link}
            size="small"
            variant="contained"
            {...LinkProps}
            sx={[
              {
                width: "100%",
                ml: "0 !important",
                ...LinkProps?.sx,
              },
            ]}
          >
            {linkLabel}
          </Button>
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
