import { useState, useEffect } from "react";
import Input from "@/robots-generator/components/Input";
import { Box } from "@mui/material";
import { validateUrl } from "@/robots-generator/utils/validateUrl";

export default function ExistingRobots() {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);

  const onInputChange = (e: string) => {
    console.log(e);
    const isValid = validateUrl(e);
    if (isValid) {
      setIsValid(true);
      setUrl(e);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Box>
      <Input
        label="Enter URL"
        onChange={onInputChange}
        placeholder="https://example.com"
      />
    </Box>
  );
}
