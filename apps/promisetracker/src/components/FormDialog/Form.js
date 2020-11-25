import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Typography,
  FormHelperText,
  TextareaAutosize,
  useMediaQuery,
} from "@material-ui/core";

import CtAButton from "@/promisetracker/components/CtAButton";

import { useTheme } from "@material-ui/core/styles";
import FormTextField from "./FormTextField";
import useStyles from "./useStyles";

function Form({ ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();

  const [images, setImages] = useState([]);
  const [fileError, setFileError] = useState(false);
  const fileInput = useRef(null);

  const {
    petitionLabel,
    petitionHelper,
    categoryLabel,
    categoryHelper,
    recipientLabel,
    recipientDescription,
    recipientNameLabel,
    recipientEmailLabel,
    recipientSocialLabel,
    issueLabel,
    issueHelper,
    imageLabel,
    imageHelper,
    uploadInstruction,
    uploadText,
    signatureLabel,
    signatureHelper,
    mandatoryText,
  } = props;

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

  const helperVariant = useMediaQuery(theme.breakpoints.up("lg"))
    ? "body1"
    : "body2";

  return (
    <form>
      <FormTextField
        labelText={petitionLabel}
        helperDescription={petitionHelper}
        elemId="petition-input"
      />
      <FormTextField
        labelText={categoryLabel}
        helperDescription={categoryHelper}
        elemId="category-input"
      />

      <Typography classes={{ root: classes.label, body1: classes.body1 }}>
        {recipientLabel}
      </Typography>
      <Typography
        id="recipient-helper-text"
        classes={{ root: classes.helperText }}
        variant={helperVariant}
      >
        {recipientDescription}
      </Typography>

      <FormTextField
        labelText={recipientNameLabel}
        elemId="recipient-name-input"
      />
      <FormTextField
        labelText={recipientEmailLabel}
        elemId="recipient-email-input"
      />
      <FormTextField
        labelText={recipientSocialLabel}
        elemId="recipient-social-input"
      />

      <FormControl classes={{ root: classes.formControl }}>
        <InputLabel htmlFor="issue-input" classes={{ root: classes.label }}>
          {issueLabel}
        </InputLabel>
        <FormHelperText
          id="issue-helper-text"
          classes={{ root: classes.helperText }}
        >
          <Typography variant={helperVariant}>{issueHelper}</Typography>
        </FormHelperText>

        <TextareaAutosize
          rowsMin={10}
          aria-label="maximum height"
          aria-describedby="issue-helper-text"
          classes={{ root: classes.textArea }}
        />
      </FormControl>

      <FormControl classes={{ root: classes.formControl }}>
        <InputLabel htmlFor="image-input" classes={{ root: classes.label }}>
          {imageLabel}
        </InputLabel>
        <FormHelperText
          id="image-helper-text"
          classes={{ root: classes.helperText }}
          error={fileError}
        >
          <Typography variant={helperVariant}>{imageHelper}</Typography>
        </FormHelperText>
        <div className={classes.imageContainer}>
          <Grid container classes={{ root: classes.gridContainer }}>
            <p className={classes.inputText}>{uploadInstruction}</p>
          </Grid>

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
            {uploadText}
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

      <FormTextField
        labelText={signatureLabel}
        helperDescription={signatureHelper}
        elemId="signature-input"
      />

      <Typography
        id="mandatory-text"
        classes={{ root: `${classes.helperText} ${classes.mandatoryText}` }}
      >
        {mandatoryText}
      </Typography>
    </form>
  );
}

Form.propTypes = {
  mandatoryText: PropTypes.string,
  petitionLabel: PropTypes.string,
  petitionHelper: PropTypes.string,
  categoryLabel: PropTypes.string,
  categoryHelper: PropTypes.string,
  recipientLabel: PropTypes.string,
  recipientDescription: PropTypes.string,
  recipientNameLabel: PropTypes.string,
  recipientEmailLabel: PropTypes.string,
  recipientSocialLabel: PropTypes.string,
  issueLabel: PropTypes.string,
  issueHelper: PropTypes.string,
  imageLabel: PropTypes.string,
  imageHelper: PropTypes.string,
  uploadInstruction: PropTypes.string,
  uploadText: PropTypes.string,
  signatureLabel: PropTypes.string,
  signatureHelper: PropTypes.string,
};

Form.defaultProps = {
  mandatoryText: null,
  petitionLabel: null,
  petitionHelper: null,
  categoryLabel: null,
  categoryHelper: null,
  recipientLabel: null,
  recipientDescription: null,
  recipientNameLabel: null,
  recipientEmailLabel: null,
  recipientSocialLabel: null,
  issueLabel: null,
  issueHelper: null,
  imageLabel: null,
  imageHelper: null,
  uploadInstruction: null,
  uploadText: null,
  signatureLabel: null,
  signatureHelper: null,
};

export default Form;
