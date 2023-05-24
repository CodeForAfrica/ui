import { createRender } from "@commons-ui/testing-library";
import { TextField } from "@mui/material";
import React from "react";

import ComboBox from "./ComboBox";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  label: "Countries",
  options: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
};

describe("<ComboBox />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <ComboBox
        renderInput={(params) => <TextField {...params} />}
        {...defaultProps}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
