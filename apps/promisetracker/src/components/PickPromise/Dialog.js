import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
  Typography,
  FormHelperText,
  DialogContentText,
  TextareaAutosize,
} from "@material-ui/core";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {},
  root: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(25)} 0`,
    },
  },
  title: {
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    "& h2": {
      textTransform: "none",
      fontFamily: "Amiri, Regular",
      fontSize: typography.pxToRem(30),
      fontWeight: "100",
    },
  },
  description: {
    color: "black",
  },
  label: {
    color: "black",
    position: "static",
    transform: "none",
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    fontSize: typography.pxToRem(16),
  },
  recipientLabel: {
    textTransform: "uppercase",
    fontFamily: "Open Sans, Bold",
    fontWeight: 600,
    fontSize: typography.pxToRem(10),
    color: "#909090",
    position: "static",
    marginBottom: "10px",
  },
  helperText: {
    color: "black",
    fontFamily: "inherit",
    marginBottom: "10px",
    fontSize: typography.pxToRem(14),
    lineHeight: "1.8",
  },
  input: {
    border: "1px solid #EBEBEB",
    backgroundColor: "#F7F7F7",
    borderRadius: "5px",
  },
  underline: {
    "&::before": {
      borderBottom: 0,
    },
  },
  formControl: {
    width: "100%",
    marginTop: "40px",
    "& textarea": {
      backgroundColor: "#F7F7F7",
      border: "1px solid #EBEBEB",
    },
  },
  formControlRecipient: {
    width: "100%",
  },
  body1: {
    marginTop: "40px",
  },
}));
// yoh break this component - too large!
function FormDialog({ open, handleFormClose, ...props }) {
  const classes = useStyles(props);

  return (
    <div classes={{ root: classes.section }}>
      <Dialog
        open={open}
        onClose={handleFormClose}
        aria-labelledby="form-dialog-title"
        classes={{ root: classes.section }}
      >
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>
          Start A Petition
        </DialogTitle>
        <DialogContent>
          <DialogContentText classes={{ root: classes.description }}>
            Start by filling out this form, and in a few minutes you will be on
            your way to collect thousands of signatures
          </DialogContentText>

          <FormControl classes={{ root: classes.formControl }}>
            <InputLabel htmlFor="my-input" classes={{ root: classes.label }}>
              Petition Title *
            </InputLabel>
            <FormHelperText
              id="my-helper-text"
              classes={{ root: classes.helperText }}
            >
              Short title, be specific and focus on outcome or solution.
            </FormHelperText>
            <Input
              variant="outlined"
              id="my-input"
              aria-describedby="my-helper-text"
              classes={{ input: classes.input, underline: classes.underline }}
            />
          </FormControl>

          <FormControl classes={{ root: classes.formControl }}>
            <InputLabel htmlFor="my-input" classes={{ root: classes.label }}>
              Category & Promise *
            </InputLabel>
            <FormHelperText
              id="my-helper-text"
              classes={{ root: classes.helperText }}
            >
              Pick from one of our existing promise categories.
            </FormHelperText>
            <Input
              variant="outlined"
              id="my-input"
              aria-describedby="my-helper-text"
              classes={{ input: classes.input, underline: classes.underline }}
            />
          </FormControl>

          <Typography classes={{ root: classes.label, body1: classes.body1 }}>
            Recipient
          </Typography>
          <Typography classes={{ root: classes.helperText }}>
            Who is this petition directed to?
          </Typography>

          <FormControl classes={{ root: classes.formControlRecipient }}>
            <InputLabel
              htmlFor="my-input"
              classes={{ root: classes.recipientLabel }}
            >
              Recipient Name
            </InputLabel>
            <Input
              variant="outlined"
              id="my-input"
              aria-describedby="my-helper-text"
              classes={{ input: classes.input, underline: classes.underline }}
            />
          </FormControl>

          <FormControl classes={{ root: classes.formControlRecipient }}>
            <InputLabel
              htmlFor="my-input"
              classes={{ root: classes.recipientLabel }}
            >
              Recipient Email
            </InputLabel>
            <Input
              variant="outlined"
              id="my-input"
              aria-describedby="my-helper-text"
              classes={{ input: classes.input, underline: classes.underline }}
            />
          </FormControl>

          <FormControl classes={{ root: classes.formControlRecipient }}>
            <InputLabel
              htmlFor="my-input"
              classes={{ root: classes.recipientLabel }}
            >
              Recipient Social Media Handle
            </InputLabel>
            <Input
              variant="outlined"
              id="my-input"
              aria-describedby="my-helper-text"
              classes={{ input: classes.input, underline: classes.underline }}
            />
          </FormControl>

          <FormControl classes={{ root: classes.formControl }}>
            <InputLabel htmlFor="my-input" classes={{ root: classes.label }}>
              What is the Issue?*
            </InputLabel>
            <FormHelperText
              id="my-helper-text"
              classes={{ root: classes.helperText }}
            >
              Explain in detail what the problem is, which area it affects, what
              solution do you propose? If solved what impact will it have? Keep
              it short and sweet
            </FormHelperText>

            <TextareaAutosize
              rowsMin={10}
              aria-label="maximum height"
              classes={{ root: classes.textArea }}
            />
          </FormControl>

          <FormControl classes={{ root: classes.formControl }}>
            <InputLabel htmlFor="my-input" classes={{ root: classes.label }}>
              Minimum Signatures
            </InputLabel>
            <FormHelperText
              id="my-helper-text"
              classes={{ root: classes.helperText }}
            >
              Number of Signatures needed for petition to pass
            </FormHelperText>
            <Input
              variant="outlined"
              id="my-input"
              aria-describedby="my-helper-text"
              classes={{ input: classes.input, underline: classes.underline }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleFormClose}>
            Submit
          </Button>
          <Button color="primary" onClick={handleFormClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
  handleFormClose: PropTypes.func,
  open: PropTypes.bool,
};

FormDialog.defaultProps = {
  open: null,
  handleFormClose: null,
};

export default FormDialog;
