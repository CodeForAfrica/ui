import { Box } from "@mui/material";
import { RichText as ConvertRichText } from "@payloadcms/richtext-lexical/react";
import { forwardRef } from "react";

import { styleConverter } from "./converter";

export const jsxConverters =
  (converterProps) =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...styleConverter(converterProps),
  });

const LexicalRichText = forwardRef(function LexicalRichText(props, ref) {
  const { elements, ...others } = props;
  const converters = jsxConverters(others);
  const { TypographyProps, ...boxProps } = others;

  return (
    <Box {...boxProps} ref={ref}>
      <ConvertRichText data={elements} converters={converters} />
    </Box>
  );
});

export default LexicalRichText;
