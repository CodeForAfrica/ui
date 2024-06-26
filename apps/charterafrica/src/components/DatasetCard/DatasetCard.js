import {
  Grid,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import { StyledActionArea as CardActionArea } from "@/charterafrica/components/StyledCard";
import formatDateTime from "@/charterafrica/utils/formatDate";

function DatasetCard({
  formats,
  notes,
  title,
  created,
  labels,
  updated,
  author,
  href,
  sx,
}) {
  const [showAll, setShowAll] = useState(false);
  const handleClick = () => setShowAll(!showAll);
  const createdAt = formatDateTime(created, { includeTime: false });
  const updatedAt = formatDateTime(updated, { includeTime: false });
  const updatedAtLabel =
    createdAt !== updatedAt ? `${labels.update} ${updatedAt} | ` : "";

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: neutral[50],
        borderRadius: 0,
        boxShadow: "none",
        ...sx,
      }}
    >
      <CardActionArea component={Link} href={href}>
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            direction={{ xs: "column", md: "row" }}
          >
            <Grid item xs={12} md={4}>
              <LineClampedRichTypography
                color="neutral.dark"
                html={false}
                lineClamp={1}
                order={1}
                variant="h5SmallSemiBold"
                sx={{ mb: 1 }}
              >
                {title}
              </LineClampedRichTypography>
              <Typography variant="p1" color="neutral.main" sx={{ mb: 1 }}>
                {updatedAtLabel} {labels.created} {createdAt}
              </Typography>
              <Typography variant="p1SemiBold" color="neutral.main">
                {author}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 4, sm: 3 }}>
              <LineClampedRichTypography
                color="common.black"
                lineClamp={showAll ? -1 : 3}
                order={1}
                variant="p1"
                sx={{ mb: 1 }}
              >
                {notes}
              </LineClampedRichTypography>
              <Button
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                  color: "neutral.dark",
                  typography: "p1",
                  textDecoration: "underline",
                  padding: 0,
                  minWidth: 0,
                }}
                onClick={handleClick}
              >
                {showAll ? labels.readLess : labels.readMore}
              </Button>
            </Grid>
            {formats.length ? (
              <Grid
                item
                xs={12}
                md={4}
                order={{ xs: 3, sm: 4 }}
                container
                justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                alignItems="center"
                sx={{
                  gap: 0.625,
                }}
              >
                {formats.map((format) => (
                  <Chip
                    label={format}
                    sx={(theme) => ({
                      backgroundColor:
                        format === "PDF"
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                      ...theme.typography.caption,
                      borderRadius: "10px",
                      display: "flex",
                    })}
                    key={format}
                  />
                ))}
              </Grid>
            ) : null}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default DatasetCard;
