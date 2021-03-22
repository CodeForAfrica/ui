import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Typography,
  FormHelperText,
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

  const { uploadInstruction, uploadText, mandatoryText } = props;

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
        labelText="What's your Update?*"
        helperDescription="Explain what the developments are, so that we understand how to update the promise"
        elemId="petition-input"
      />
      <FormTextField
        labelText="Who else can confirm your update?"
        helperDescription="Do you have any witnesses or are there any other people we can confirm your update with?"
        elemId="category-input"
      />
      <FormTextField
        labelText="When did the update happen?*"
        helperDescription="Tell us how recently the development happened, so we understand the timelines"
        elemId="category-input"
      />
      <FormTextField
        labelText="How do we contact you?*"
        helperDescription="What is your WhatsApp numer or email, so we can confirm the update and keep you informed?"
        elemId="category-input"
      />

      <FormControl classes={{ root: classes.formControl }}>
        <InputLabel htmlFor="image-input" classes={{ root: classes.label }}>
          What evidence do you have?
        </InputLabel>
        <FormHelperText
          id="image-helper-text"
          classes={{ root: classes.helperText }}
          error={fileError}
        >
          <Typography variant={helperVariant}>
            Upload photos, videos, audio recordings or documents to support your
            update
          </Typography>
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
  uploadInstruction: PropTypes.string,
  uploadText: PropTypes.string,
};

Form.defaultProps = {
  mandatoryText: null,
  uploadInstruction: null,
  uploadText: null,
};

export default Form;
