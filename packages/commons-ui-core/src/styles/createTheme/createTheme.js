import { createTheme as muiCreateTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

import createContentWidths from "./createContentWidths";

function createTheme(options = {}) {
  const { breakpoints, contentWidths: contentWidthsInput } = options;
  const contentWidths = createContentWidths(contentWidthsInput, breakpoints);

  return muiCreateTheme(deepmerge(options, { contentWidths }));
}

export default createTheme;
