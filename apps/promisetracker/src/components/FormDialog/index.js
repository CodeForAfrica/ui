import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
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

import CtAButton from "@/promisetracker/components/CtAButton";
import useStyles from "./useStyles";

function FormDialog({ open, handleFormClose, ...props }) {
  const classes = useStyles(props);
  const [images, setImages] = useState([]);
  const [fileError, setFileError] = useState(false);
  const fileInput = useRef(null);

  const handleFileValidation = (fileSize) => {
    const maxAllowedSize = 10 * 500 * 300;
    // Check if file size is below 10MB
    if (fileSize > maxAllowedSize) {
      setFileError(true);
      return true;
    }

    setFileError(false);
    return false;
  };

  const onFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    const fileSize = e.target.files[0].size;

    if (handleFileValidation(fileSize)) return;

    setImages([file]);
  };

  // Use DragAndDrop API for image selection
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const uploadedImage = [];
    const dt = e.dataTransfer;
    const { files } = dt;

    [...files].forEach((file) => {
      if (handleFileValidation(file.size)) return;

      // Get URL of image file to be used for thumbnail preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        uploadedImage.push(reader.result);
        setImages(uploadedImage);
      };
    });
  };

  const handleClick = () => {
    fileInput.current.click();
  };

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
          <form>
            <FormControl classes={{ root: classes.formControl }}>
              <InputLabel
                htmlFor="petition-label"
                classes={{ root: classes.label }}
              >
                Petition Title *
              </InputLabel>
              <FormHelperText
                id="petition-helper-text"
                classes={{ root: classes.helperText }}
              >
                Short title, be specific and focus on outcome or solution.
              </FormHelperText>
              <Input
                variant="outlined"
                id="petition-label"
                aria-describedby="petition-helper-text"
                classes={{ input: classes.input, underline: classes.underline }}
              />
            </FormControl>

            <FormControl classes={{ root: classes.formControl }}>
              <InputLabel
                htmlFor="categories-input"
                classes={{ root: classes.label }}
              >
                Category & Promise *
              </InputLabel>
              <FormHelperText
                id="categories-helper-text"
                classes={{ root: classes.helperText }}
              >
                Pick from one of our existing promise categories.
              </FormHelperText>
              <Input
                variant="outlined"
                id="categories-input"
                aria-describedby="categories-helper-text"
                classes={{ input: classes.input, underline: classes.underline }}
              />
            </FormControl>

            <Typography classes={{ root: classes.label, body1: classes.body1 }}>
              Recipient
            </Typography>
            <Typography
              id="recipient-helper-text"
              classes={{ root: classes.helperText }}
            >
              Who is this petition directed to?
            </Typography>

            <FormControl classes={{ root: classes.formControlRecipient }}>
              <InputLabel
                htmlFor="recipient-input"
                classes={{ root: classes.recipientLabel }}
              >
                Recipient Name
              </InputLabel>
              <Input
                variant="outlined"
                id="recipient-input"
                aria-describedby="recipient-helper-text"
                classes={{ input: classes.input, underline: classes.underline }}
              />
            </FormControl>

            <FormControl classes={{ root: classes.formControlRecipient }}>
              <InputLabel
                htmlFor="recipient-email-input"
                classes={{ root: classes.recipientLabel }}
              >
                Recipient Email
              </InputLabel>
              <Input
                variant="outlined"
                id="recipient-email-input"
                aria-describedby="recipient-helper-text"
                classes={{ input: classes.input, underline: classes.underline }}
              />
            </FormControl>

            <FormControl classes={{ root: classes.formControlRecipient }}>
              <InputLabel
                htmlFor="recipient-social-input"
                classes={{ root: classes.recipientLabel }}
              >
                Recipient Social Media Handle
              </InputLabel>
              <Input
                variant="outlined"
                id="recipient-social-input"
                aria-describedby="recipient-helper-text"
                classes={{ input: classes.input, underline: classes.underline }}
              />
            </FormControl>

            <FormControl classes={{ root: classes.formControl }}>
              <InputLabel
                htmlFor="issue-input"
                classes={{ root: classes.label }}
              >
                What is the Issue ?*
              </InputLabel>
              <FormHelperText
                id="issue-helper-text"
                classes={{ root: classes.helperText }}
              >
                Explain in detail what the problem is, which area it affects,
                what solution do you propose? If solved what impact will it
                have? Keep it short and sweet
              </FormHelperText>

              <TextareaAutosize
                rowsMin={10}
                aria-label="maximum height"
                aria-describedby="issue-helper-text"
                classes={{ root: classes.textArea }}
              />
            </FormControl>

            <FormControl classes={{ root: classes.formControl }}>
              <InputLabel
                htmlFor="image-input"
                classes={{ root: classes.label }}
              >
                Featured Image*
              </InputLabel>
              <FormHelperText
                id="image-helper-text"
                classes={{ root: classes.helperText }}
                error={fileError}
              >
                The image should be at least 500px wide and 300px high and a
                maximum size of 10MB
              </FormHelperText>
              <div className={classes.imageContainer}>
                <p className={classes.inputText}>Drop Image here or:</p>

                <Input
                  inputRef={fileInput}
                  type="file"
                  id="image-input"
                  onChange={onFileChange}
                  aria-describedby="image-helper-text"
                  classes={{
                    root: classes.imageInput,
                    underline: classes.underline,
                  }}
                  onDragOver={handleDrag}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                />
                <CtAButton
                  color="secondary"
                  onClick={handleClick}
                  classes={{
                    button: classes.uploadButton,
                    root: classes.button,
                  }}
                >
                  Click to Select Image to Upload
                </CtAButton>
                <div>
                  {images.map((image) => {
                    return (
                      <img
                        alt=""
                        className={classes.imageThumbnail}
                        key={image}
                        src={image}
                      />
                    );
                  })}
                </div>
              </div>
            </FormControl>

            <FormControl classes={{ root: classes.formControl }}>
              <InputLabel
                htmlFor="signature-input"
                classes={{ root: classes.label }}
              >
                Minimum Signatures
              </InputLabel>
              <FormHelperText
                id="signature-helper-text"
                classes={{ root: classes.helperText }}
              >
                Number of Signatures needed for petition to pass
              </FormHelperText>
              <Input
                variant="outlined"
                id="signature-input"
                aria-describedby="signature-helper-text"
                classes={{ input: classes.input, underline: classes.underline }}
              />
            </FormControl>

            <Typography
              id="mandatory-text"
              classes={{ root: classes.helperText }}
            >
              * Mandatory fields
            </Typography>
          </form>
        </DialogContent>

        <DialogActions>
          <CtAButton color="primary" onClick={handleFormClose}>
            Submit
          </CtAButton>
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
