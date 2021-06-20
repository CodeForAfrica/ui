import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Typography,
  FormHelperText,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";

import FormTextField from "./FormTextField";
import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";

function Form({ promise_act_now: promiseActNow, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();

  const [images, setImages] = useState([]);
  const [fileError, setFileError] = useState(false);
  const fileInput = useRef(null);

  const { mandatoryText } = props;
  const {
    update: {
      contact_label: contactLabel,
      contact_label_description: contactLabelDescription,
      evidence_label: evidenceLabel,
      evidence_label_description: evidenceLabelDescription,
      image_upload_description: imageUploadDescription,
      what_label: whatLabel,
      what_label_description: whatLabelDescription,
      when_label: whenLabel,
      when_label_description: whenLabelDescription,
      who_label: whoLabel,
      who_label_description: whoLabelDescription,
    },
  } = promiseActNow;

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
        labelText={whatLabel}
        helperDescription={whatLabelDescription}
        elemId="petition-input"
      />
      <FormTextField
        labelText={whoLabel}
        helperDescription={whoLabelDescription}
        elemId="category-input"
      />
      <FormTextField
        labelText={whenLabel}
        helperDescription={whenLabelDescription}
        elemId="category-input"
      />
      <FormTextField
        labelText={contactLabel}
        helperDescription={contactLabelDescription}
        elemId="category-input"
      />

      <FormControl classes={{ root: classes.formControl }}>
        <InputLabel htmlFor="image-input" classes={{ root: classes.label }}>
          {evidenceLabel}
        </InputLabel>
        <FormHelperText
          id="image-helper-text"
          classes={{ root: classes.helperText }}
          error={fileError}
        >
          <Typography variant={helperVariant}>
            {evidenceLabelDescription}
          </Typography>
        </FormHelperText>
        <div className={classes.imageContainer}>
          <Grid container classes={{ root: classes.gridContainer }}>
            <p className={classes.inputText}>drop image here or</p>
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
            {imageUploadDescription}
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
  promise_act_now: PropTypes.shape({
    update: {
      uploadInstruction: PropTypes.string,
      uploadText: PropTypes.string,
      contactLabel: PropTypes.string,
      contactLabelDescription: PropTypes.string,
      evidenceLabel: PropTypes.string,
      evidenceLabelDescription: PropTypes.string,
      imageUploadDescription: PropTypes.string,
      whatLabel: PropTypes.string,
      whatLabelDescription: PropTypes.string,
      whenLabel: PropTypes.string,
      whenLabelDescription: PropTypes.string,
      whoLabel: PropTypes.string,
      whoLabelDescription: PropTypes.string,
    },
  }),
};

Form.defaultProps = {
  mandatoryText: null,
  promise_act_now: PropTypes.shape({
    update: {
      uploadInstruction: null,
      uploadText: null,
      contactLabel: null,
      contactLabelDescription: null,
      evidenceLabel: null,
      evidenceLabelDescription: null,
      imageUploadDescription: null,
      whatLabel: null,
      whatLabelDescription: null,
      whenLabel: null,
      whenLabelDescription: null,
      whoLabel: null,
      whoLabelDescription: null,
    },
  }),
};

export default Form;
