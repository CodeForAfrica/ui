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
    // TODO(kilemensi): {...others} need to be removed but all apps must be
    //                  checked first
    <Box {...others} sx={sx} ref={ref}>
      <RichText converters={converters} data={elements} disableContainer />
    </Box>
  );
});

export default LexicalRichText;
