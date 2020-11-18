import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Section } from "@commons-ui/core";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import CtAButton from "@/promisetracker/components/CtAButton";

const useStyles = makeStyles(() => ({
  section: {
    color: "blue",
  },
}));

function PickPromise(props) {
  const classes = useStyles(props);

  return (
    <div>
      <Section>
        <Typography className={classes.section} variant="p">
          Pick a Promise
        </Typography>
        <Typography className={classes.section} variant="p">
          Which Promise do you want to petition?
        </Typography>
        <Autocomplete
          options={[{ label: "name" }, { label: "age" }, { label: "height" }]}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(option) => (
            <>
              <span>{option.label}</span>
            </>
          )}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="No Promises Selected"
              variant="outlined"
            />
          )}
        />
        <CtAButton color="secondary">Start A Petiton</CtAButton>
        <CtAButton color="secondary">Join A Petiton</CtAButton>
      </Section>
    </div>
  );
}

export default PickPromise;
