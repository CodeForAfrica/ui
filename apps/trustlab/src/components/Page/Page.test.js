import Page from "./Page";

import { render } from "@/trustlab/utils/testRender";

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
