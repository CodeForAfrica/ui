import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Explainers from "./Explainers";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Explainers",
  explainers: Array.from({ length: 5 }, (_, i) => ({
    id: i,
    title: "Event title going on two or even three lines",
    description: [
      {
        children: [
          {
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur ",
          },
        ],
      },
    ],
    image: {
      url: "https://user-images.githubusercontent.com/39160236/214778112-7aefbe8f-11f2-423f-b6c9-a284feaf9b33.png",
      fill: true,
      alt: `Event ${i}`,
    },
  })),
};
describe("<Explainers />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Explainers {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
