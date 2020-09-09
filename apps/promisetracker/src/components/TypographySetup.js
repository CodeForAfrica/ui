import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";

export default function TypographySetup() {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h1" align="center" style={{ padding: "1rem 0rem" }}>
        <em style={{ color: "#005DFD" }}>H1: </em> Lorem ipsum dolor sit amet,
        consectetur
      </Typography>

      <Typography variant="h2" align="center" style={{ padding: "1rem 0rem" }}>
        <em style={{ color: "#005DFD" }}>H2: </em> Lorem ipsum dolor sit amet,
        consectetur
      </Typography>

      <Typography variant="h3" align="center" style={{ padding: "1rem 0rem" }}>
        <em style={{ color: "#005DFD" }}>H3: </em> Lorem ipsum dolor sit amet,
        consectetur
      </Typography>

      <Typography variant="h4" align="center" style={{ padding: "1rem 0rem" }}>
        <em style={{ color: "#005DFD" }}>H4: </em> Lorem ipsum dolor sit amet,
        consectetur
      </Typography>

      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        style={{ padding: "1rem 0rem" }}
      >
        <em style={{ color: "#005DFD" }}>H5: </em> Lorem ipsum dolor sit amet,
        consectetur
      </Typography>

      <Typography variant="h6" align="center" style={{ padding: "1rem 0rem" }}>
        <em style={{ color: "#005DFD" }}>H6: </em> Lorem ipsum dolor sit amet,
        consectetur
      </Typography>
      <hr />

      <Typography
        variant="body1"
        align="center"
        style={{ padding: "1rem 0rem" }}
      >
        <em style={{ color: "#005DFD" }}>body1: </em> Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Curabitur venenatis tincidunt quam.
        Etiam venenatis, nulla a hendrerit ullamcorper,massa libero lobortis
        nibh, onsequat augue velit ac lectus.
      </Typography>

      <Typography
        variant="body2"
        align="center"
        style={{ padding: "1rem 0rem" }}
      >
        <em style={{ color: "#005DFD" }}>body2: </em> Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Curabitur venenatis tincidunt quam.
        Etiam venenatis, nulla a hendrerit ullamcorper,massa libero lobortis
        nibh, onsequat augue velit ac lectus.
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        style={{ padding: "1rem 0rem" }}
      >
        <em style={{ color: "#005DFD" }}>subtitle1: </em> Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Curabitur venenatis tincidunt quam.
        Etiam venenatis, nulla a hendrerit ullamcorper,massa libero lobortis
        nibh, onsequat augue velit ac lectus.
      </Typography>

      <Typography
        variant="subtitle2"
        align="center"
        style={{ padding: "1rem 0rem" }}
      >
        <em style={{ color: "#005DFD" }}>subtitle2: </em> Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Curabitur venenatis tincidunt quam.
        Etiam venenatis, nulla a hendrerit ullamcorper,massa libero lobortis
        nibh, onsequat augue velit ac lectus.
      </Typography>

      <Typography
        variant="caption"
        align="center"
        style={{ padding: "1rem 0rem" }}
      >
        <em style={{ color: "#005DFD" }}>caption: </em> Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Curabitur venenatis tincidunt quam.
        Etiam venenatis, nulla a hendrerit ullamcorper,massa libero lobortis
        nibh, onsequat augue velit ac lectus.
      </Typography>

      <Typography
        variant="button"
        align="center"
        color="textSecondary"
        style={{ padding: "1rem 0rem" }}
      >
        <em style={{ color: "#005DFD" }}>button: </em> Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Curabitur venenatis tincidunt quam.
        Etiam venenatis, nulla a hendrerit ullamcorper,massa libero lobortis
        nibh, onsequat augue velit ac lectus.
      </Typography>

      <Grid container direction="row" justify="space-between" align="center">
        <Button variant="contained" size="large">
          Example
        </Button>
        <Button variant="contained" color="primary" size="large">
          Example
        </Button>
        <Button variant="contained" color="secondary" size="large">
          Example
        </Button>
      </Grid>
    </Grid>
  );
}
