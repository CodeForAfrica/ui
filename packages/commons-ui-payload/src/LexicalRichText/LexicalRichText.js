import { Box } from "@mui/material";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { forwardRef } from "react";

import { styleConverter } from "./converter";

export const jsxConverters =
  (converterProps) =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...styleConverter(converterProps),
  });

const LexicalRichText = forwardRef(function LexicalRichText(props, ref) {
  const { elements, sx, ...converterProps } = props;
  const converters = jsxConverters(converterProps);
  const { TypographyProps, ...others } = converterProps;

  return (
    <Box {...others} sx={sx} ref={ref}>
      <RichText converters={converters} data={elements} disableContainer />
    </Box>
  );
});

export default LexicalRichText;
