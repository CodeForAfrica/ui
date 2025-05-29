import { Button } from "payload/components/elements";
import {
  TextInput,
  reduceFieldsToValues,
  useField,
  useFormFields,
} from "payload/components/forms";
import { createElement, useState } from "react";

// TODO: @kelvinkipruto Handle i18n
function HURUmapURL(props) {
  const {
    admin: { description },
    path,
  } = props;
  const { value, setValue } = useField({ path });
  const [loading, setLoading] = useState(false);
  const [formFields, updateFormField] = useFormFields(([fields, dispatch]) => [
    fields,
    dispatch,
  ]);
  const { urlValid } = reduceFieldsToValues(formFields, true);

  const validateURL = async () => {
    if (!value) {
      return;
    }
    setLoading(true);
    try {
      // For now we can use the profiles endpoint to check if the URL is valid
      // Ideally we should have a dedicated endpoint for this, like /api/v1/validate or /api/v1/health
      const response = await fetch(`${value}/profiles`);
      updateFormField({
        type: "UPDATE",
        path: "urlValid",
        value: response.ok,
      });
    } catch (error) {
      updateFormField({
        type: "UPDATE",
        path: "urlValid",
        value: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newUrl = e.target.value;
    setValue(newUrl);
  };

  return createElement(
    "div",
    {
      id: "hurumap-url-wrapper",
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
      },
    },
    createElement(TextInput, {
      ...props,
      value,
      onChange: handleInputChange,
      description,
      errorMessage:
        !urlValid &&
        "Invalid URL. Please enter a valid URL to continue configuration.",
      showError: !urlValid,
    }),
    createElement(
      Button,
      {
        type: "button",
        onClick: () => validateURL(),
        className: "btn btn--style-primary",
        disabled: loading,
      },
      loading ? "Checking..." : "Validate URL",
    ),
  );
}

export default HURUmapURL;
