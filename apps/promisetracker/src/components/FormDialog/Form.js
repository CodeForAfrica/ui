import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  FormHelperText,
  TextareaAutosize,
} from "@material-ui/core";

import CtAButton from "@/promisetracker/components/CtAButton";
import useStyles from "./useStyles";

function Form({ ...props }) {
  const classes = useStyles(props);
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

  return (
    <form>
      <FormControl classes={{ root: classes.formControl }}>
        <InputLabel htmlFor="petition-label" classes={{ root: classes.label }}>
          {petitionLabel}
        </InputLabel>
        <FormHelperText
          id="petition-helper-text"
          classes={{ root: classes.helperText }}
        >
          {petitionHelper}
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
          {categoryLabel}
        </InputLabel>
        <FormHelperText
          id="categories-helper-text"
          classes={{ root: classes.helperText }}
        >
          {categoryHelper}
        </FormHelperText>
        <Input
          variant="outlined"
          id="categories-input"
          aria-describedby="categories-helper-text"
          classes={{ input: classes.input, underline: classes.underline }}
        />
      </FormControl>

      <Typography classes={{ root: classes.label, body1: classes.body1 }}>
        {recipientLabel}
      </Typography>
      <Typography
        id="recipient-helper-text"
        classes={{ root: classes.helperText }}
      >
        {recipientDescription}
      </Typography>

      <FormControl classes={{ root: classes.formControlRecipient }}>
        <InputLabel
          htmlFor="recipient-input"
          classes={{ root: classes.recipientLabel }}
        >
          {recipientNameLabel}
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
          {recipientEmailLabel}
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
          {recipientSocialLabel}
        </InputLabel>
        <Input
          variant="outlined"
          id="recipient-social-input"
          aria-describedby="recipient-helper-text"
          classes={{ input: classes.input, underline: classes.underline }}
        />
      </FormControl>

      <FormControl classes={{ root: classes.formControl }}>
        <InputLabel htmlFor="issue-input" classes={{ root: classes.label }}>
          {issueLabel}
        </InputLabel>
        <FormHelperText
          id="issue-helper-text"
          classes={{ root: classes.helperText }}
        >
          {issueHelper}
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
          {imageHelper}
        </FormHelperText>
        <div className={classes.imageContainer}>
          <p className={classes.inputText}>{uploadInstruction}</p>

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

      <FormControl classes={{ root: classes.formControl }}>
        <InputLabel htmlFor="signature-input" classes={{ root: classes.label }}>
          {signatureLabel}
        </InputLabel>
        <FormHelperText
          id="signature-helper-text"
          classes={{ root: classes.helperText }}
        >
          {signatureHelper}
        </FormHelperText>
        <Input
          variant="outlined"
          id="signature-input"
          aria-describedby="signature-helper-text"
          classes={{ input: classes.input, underline: classes.underline }}
        />
      </FormControl>

      <Typography id="mandatory-text" classes={{ root: classes.helperText }}>
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
