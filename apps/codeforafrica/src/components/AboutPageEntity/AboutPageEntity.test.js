import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AboutPageEntity from "./AboutPageEntity";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  description: [
    {
      text: "Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent",
    },
    {
      text: "tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat. ",
    },
    {
      text: "Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada.",
    },
  ],
};

describe("<AboutPageEntity />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AboutPageEntity {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
