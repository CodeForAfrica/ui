import { Typography, Grid } from "@mui/material";

export default function Legend({ legend, title = "Average Temperature", sx }) {
  return (
    <Grid
      spacing={2}
      sx={(theme) => ({
        position: "absolute",
        zIndex: 1000,
        width: "fit-content",
        bottom: theme.spacing(30),
        right: theme.spacing(20),
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        boxShadow: theme.shadows[3],
        ...sx,
      })}
    >
      <Typography
        variant="subtitle2"
        sx={(theme) => ({
          color: theme.palette.text.primary,
          marginBottom: theme.spacing(2),
        })}
      >
        {title}
      </Typography>
      {legend?.map(({ min, max, color }) => (
        <Grid
          container
          key={`${min}-${max}`}
          alignItems="center"
          spacing={1}
          sx={(theme) => ({
            padding: theme.spacing(1),
          })}
        >
          <Grid
            item
            sx={(theme) => ({
              backgroundColor: color,
              width: theme.spacing(4),
              height: theme.spacing(4),
            })}
          />
          <Grid item xs>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({ color: theme.palette.text.primary })}
            >
              {min} - {max}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
