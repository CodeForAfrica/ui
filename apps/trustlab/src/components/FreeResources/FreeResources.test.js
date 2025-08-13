import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FreeResources from "./FreeResources";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Free Resources",
  resources: [
    {
      title: "RiskDetection toolkit",
      description: "This is a description of the resource.",
      icon: {
        src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
        alt: "Resource Image",
      },
    },
    {
      title: "Roboshield toolkit",
      description: "This is a description of the resource.",
      icon: {
        src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
        alt: "Resource Image",
      },
    },
    {
      title: "SelfDefence software",
      description: "This is a description of the resource.",
      icon: {
        src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
        alt: "Resource Image",
      },
    },
    {
      title: "PolicyForge toolkit",
      description: "This is a description of the resource.",
      icon: {
        src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
        alt: "Resource Image",
      },
    },
  ],
};

describe("<FreeResources />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FreeResources {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
