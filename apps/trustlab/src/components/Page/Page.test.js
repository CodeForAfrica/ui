import { createRender } from "@commons-ui/testing-library";

import Page from "./Page";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  seo: { title: "Test Page" },
};

describe("<Page />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <Page {...defaultProps}>
        <div>Test Content</div>
      </Page>,
    );
    expect(container).toMatchSnapshot();
  });
});
