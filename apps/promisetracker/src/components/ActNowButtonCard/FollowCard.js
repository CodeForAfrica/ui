import React from "react";
import { TextField, CardContent, Typography, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";

import useStyles from "./useStyles";

const FollowCard = () => {
  const classes = useStyles();

  return (
    <>
      <CardContent>
        <Grid container justify="center">
          <Typography variant="h4">Follow</Typography>
        </Grid>
        <Grid container justify="center">
          <p className={classes.cardText}>
            Get alerts whenever there is a development on the promise
          </p>
        </Grid>
        <Grid>
          <form className={classes.formContainer}>
            {/* <InputLabel htmlFor="data">Enter data</InputLabel>
            <Input id="data" /> */}
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              className={classes.input}
            />
            <CtAButton
              color="primary"
              classes={{
                root: classes.cardButtonRoot,
                button: `${classes.submitButton} } `,
              }}
            >
              SUBMIT
            </CtAButton>
          </form>
        </Grid>
      </CardContent>
    </>
  );
};

export default FollowCard;
