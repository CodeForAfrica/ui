import { Button } from "payload/components/elements";
import {
  Label,
  TextInput,
  useField,
  useFormFields,
} from "payload/components/forms";
import { createElement, useState, useEffect } from "react";

// TODO: @kelvinkipruto Handle i18n
function HURUMapURL(props) {
  const {
    admin: { description },
    name,
    path,
  } = props;
  const { value, setValue } = useField({ path });
  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const HURUMapAPIURLValid = useFormFields(([_, dispatch]) => dispatch);

  const validateURL = async () => {
    if (!value) return;
    setLoading(true);
    try {
      // For now we can use the profiles endpoint to check if the URL is valid
      // Ideally we should have a dedicated endpoint for this, like /api/v1/validate or /api/v1/health
      const response = await fetch(`${value}/profiles`);
      setIsValid(response.ok);
      HURUMapAPIURLValid({
        type: "UPDATE",
        path: "HURUMapAPIURLValid",
        value: response.ok,
      });
    } catch (error) {
      setIsValid(false);
      HURUMapAPIURLValid({
        type: "UPDATE",
        path: "HURUMapAPIURLValid",
        value: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const isURLValid = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i", // fragment locator
    );
    return !!urlPattern.test(url);
  };

  const handleInputChange = (e) => {
    const newUrl = e.target.value;
    setValue(newUrl);
    setIsValid(null);
    setIsButtonDisabled(!isURLValid(newUrl));
  };

  useEffect(() => {
    setIsButtonDisabled(!isURLValid(value));
  }, [value]);

  return createElement(
    "div",
    {
      id: "hurumap-url-wrapper",
    },
    createElement(TextInput, {
      ...props,
      value,
      onChange: handleInputChange,
    }),
    description &&
      createElement(
        "span",
        {
          className: "field-description",
        },
        description,
      ),
    createElement(
      Button,
      {
        type: "button",
        onClick: () => validateURL(),
        className: "btn btn--style-primary",
        disabled: loading || isButtonDisabled,
      },
      loading ? "Checking..." : "Validate URL",
    ),
    isValid !== null &&
      createElement(Label, {
        label: isValid ? "✓ URL is valid" : "✗ Invalid URL",
        htmlFor: `field-${name}`,
      }),
  );
}

export default HURUMapURL;
