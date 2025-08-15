import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Resources from "./Resources";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Helplines",
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

describe("<Resources />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Resources {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
