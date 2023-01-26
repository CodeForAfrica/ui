import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Explainers from "./Explainers";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  explainers: Array(5).fill({
    title: "Event title going on two or even three lines",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur ",
    image: {
      src: "https://user-images.githubusercontent.com/39160236/214778112-7aefbe8f-11f2-423f-b6c9-a284feaf9b33.png",
    },
  }),
};
describe("<Explainers />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Explainers {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
