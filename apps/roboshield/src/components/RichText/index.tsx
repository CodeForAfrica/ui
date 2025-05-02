import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";
import { styleConverter } from "./styleConverter";
import { Box } from "@mui/material";
import { forwardRef } from "react";

export type Children = DefaultNodeTypes[];

export const jsxConverters =
  (converterProps: any): JSXConvertersFunction<DefaultNodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...styleConverter(converterProps),
  });

type Props = {
  elements: DefaultTypedEditorState;
  [key: string]: any;
} & React.HTMLAttributes<HTMLDivElement>;

const RichText = forwardRef<HTMLDivElement, Props>(
  function RichText(props, ref) {
    const { elements, ...others } = props;
    const converters = jsxConverters(others);

    return (
      <Box {...others} ref={ref}>
        <ConvertRichText data={elements} converters={converters} />
      </Box>
    );
  },
);

export default RichText;
