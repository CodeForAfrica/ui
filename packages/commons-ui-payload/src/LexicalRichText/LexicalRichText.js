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
  const { elements, ...converterProps } = props;
  const converters = jsxConverters(converterProps);
  const { TypographyProps, ...others } = converterProps;

  return (
    <Box {...others} ref={ref}>
      <ConvertRichText data={elements} converters={converters} />
    </Box>
  );
});

export default LexicalRichText;
