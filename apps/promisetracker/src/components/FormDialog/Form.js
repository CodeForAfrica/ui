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
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";

import FormTextField from "./FormTextField";
import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";

function Form({
  values,
  onChange: handleFormChange,
  onSubmit: handleSubmit,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();

  const [images, setImages] = useState([]);
  const [fileError, setFileError] = useState(false);
  const fileInput = useRef(null);

  const {
    petitionLabel,
    petitionHelper,
    recipientLabel,
    recipientDescription,
    recipientEmailLabel,
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

    const reader = new FileReader();
    reader.onload = function loadFiles(readerEvt) {
      const newValues = { ...values };
      newValues.image = readerEvt.target.result;
      handleFormChange(newValues);
    };
    reader.readAsBinaryString(e.target.files[0]);
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

  const handleChange = (event, name) => {
    const newValues = { ...values };
    newValues[name] = event.target.value;
    handleFormChange(newValues);
  };

  const helperVariant = useMediaQuery(theme.breakpoints.up("lg"))
    ? "body1"
    : "body2";

  return (
    <form id="form-data" onSubmit={handleSubmit}>
      <FormTextField
        required
        labelText={petitionLabel}
        helperDescription={petitionHelper}
        elemId="petition-input"
        onChange={(event) => handleChange(event, "title")}
        value={values.title}
      />
      <FormTextField
        required
        labelText="Petition Description"
        helperDescription="Short and precise description"
        elemId="petition-descriptioninput"
        onChange={(event) => handleChange(event, "description")}
        value={values.description}
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
        required
        type="email"
        labelText={recipientEmailLabel}
        elemId="recipient-email-input"
        value={values.recipients}
        onChange={(event) => handleChange(event, "recipients")}
      />
      <FormTextField
        required
        type="url"
        labelText="Petition Source"
        helperDescription="Link to describe this petition"
        elemId="petition-source-input"
        onChange={(event) => handleChange(event, "source")}
        value={values.source}
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
          onChange={(event) => handleChange(event, "problemStatement")}
          minRows={10}
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
                // next/image doesn't support blob URL
                // see: https://github.com/vercel/next.js/pull/23622
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={image}
                  src={image}
                  alt=""
                  className={classes.imageThumbnail}
                />
              );
            })}
          </div>
        </div>
      </FormControl>

      <FormTextField
        required
        type="number"
        labelText={signatureLabel}
        helperDescription={signatureHelper}
        elemId="signature-input"
        onChange={(event) => handleChange(event, "numberOfSignaturesRequired")}
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
  categoryHelper: PropTypes.string,
  categoryLabel: PropTypes.string,
  imageHelper: PropTypes.string,
  imageLabel: PropTypes.string,
  issueHelper: PropTypes.string,
  issueLabel: PropTypes.string,
  mandatoryText: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  petitionHelper: PropTypes.string,
  petitionLabel: PropTypes.string,
  recipientDescription: PropTypes.string,
  recipientEmailLabel: PropTypes.string,
  recipientLabel: PropTypes.string,
  recipientNameLabel: PropTypes.string,
  recipientSocialLabel: PropTypes.string,
  signatureHelper: PropTypes.string,
  signatureLabel: PropTypes.string,
  uploadInstruction: PropTypes.string,
  uploadText: PropTypes.string,
  values: PropTypes.shape({
    description: PropTypes.string,
    recipients: PropTypes.string,
    title: PropTypes.string,
    source: PropTypes.string,
  }),
};

Form.defaultProps = {
  mandatoryText: null,
  onChange: null,
  onSubmit: null,
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
  values: null,
};

export default Form;
